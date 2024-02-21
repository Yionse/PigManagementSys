import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Healthrecord } from '../entity/entities/Healthrecord';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

@Controller('/health')
export class HealthController {
  @InjectEntityModel(Healthrecord)
  healthModel: Repository<Healthrecord>; // 注入健康记录实体模型

  @Inject()
  ctx: Context; // 注入上下文对象

  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Get('/list')
  async list() {
    const res = await this.healthModel.find(); // 查询健康信息列表
    return this.utils.send(this.ctx, '获取健康信息列表', 200, { data: res }); // 返回查询结果
  }

  @Post('/add')
  async add(@Body() healthRecord: Healthrecord) {
    let newData = new Healthrecord(); // 创建新的健康记录对象
    newData = {
      ...healthRecord,
    }; // 复制属性
    await this.healthModel.save(newData); // 保存新增的健康记录
    return this.utils.send(this.ctx, '新增成功'); // 返回新增成功信息
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Healthrecord) {
    const newData = await this.healthModel.findOne({ where: { recordId } }); // 根据记录ID查找数据
    Object.assign(newData, updateData); // 更新数据
    await this.healthModel.save(newData); // 保存更新后的数据
    return this.utils.send(this.ctx, '修改成功'); // 返回修改成功信息
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.healthModel.delete(ids); // 根据ID删除数据
    return this.utils.send(this.ctx, '删除成功'); // 返回删除成功信息
  }
}
