import { Controller, Inject, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Entryrecord } from '../entity/entities/Entryrecord';

@Controller('/entry')
export class EntryController {
  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Inject()
  ctx: Context; // 注入上下文对象

  @InjectEntityModel(Entryrecord)
  model: Repository<Entryrecord>; // 注入实体模型

  @Get('/list')
  async list() {
    const res = await this.model.find({}); // 查询数据
    return this.utils.send(this.ctx, '查询列表成功', 200, { data: res }); // 返回查询结果
  }

  @Post('/add')
  async add(@Body() newData: Entryrecord) {
    let modelData = new Entryrecord(); // 创建新的入职记录对象
    modelData = {
      ...newData,
    }; // 复制属性
    await this.model.save(modelData); // 保存新增的入职记录
    return this.utils.send(this.ctx, '添加成功'); // 返回添加成功信息
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Entryrecord) {
    const newModelData = await this.model.findOne({ where: { recordId } }); // 根据记录ID查找数据
    Object.assign(newModelData, updateData); // 更新数据
    await this.model.save(newModelData); // 保存更新后的数据
    return this.utils.send(this.ctx, '修改成功'); // 返回修改成功信息
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.model.delete(ids); // 根据ID删除数据
    return this.utils.send(this.ctx, '删除成功'); // 返回删除成功信息
  }
}
