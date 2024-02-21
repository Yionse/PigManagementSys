import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Breedingrecord } from '../entity/entities/Breedingrecord';

@Controller('/breeding')
export class BreedingRecordController {
  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Inject()
  ctx: Context; // 注入上下文对象

  @InjectEntityModel(Breedingrecord)
  breedModel: Repository<Breedingrecord>; // 注入实体模型

  @Get('/list')
  async list() {
    const res = await this.breedModel.find({}); // 查询数据
    return this.utils.send(this.ctx, '查询列表成功', 200, { data: res }); // 返回查询结果
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Breedingrecord) {
    const newModelData = await this.breedModel.findOne({ where: { recordId } }); // 根据记录ID查找数据
    Object.assign(newModelData, updateData); // 更新数据
    await this.breedModel.save(newModelData); // 保存更新后的数据
    return this.utils.send(this.ctx, '修改成功'); // 返回修改成功信息
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.breedModel.delete(ids); // 根据ID删除数据
    return this.utils.send(this.ctx, '删除成功'); // 返回删除成功信息
  }

  @Post('/add')
  async add(@Body() breeding: Breedingrecord) {
    let newBreeding = new Breedingrecord(); // 创建新的养殖记录对象
    newBreeding = { ...breeding }; // 复制属性
    await this.breedModel.save(newBreeding); // 保存新增的养殖记录
    return this.utils.send(this.ctx, '新增成功'); // 返回新增成功信息
  }
}
