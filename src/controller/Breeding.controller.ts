import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Breeding } from '../entity/entities/Breeding';

@Controller('/breedings')
export class BreedingController {
  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Inject()
  ctx: Context; // 注入上下文对象

  @InjectEntityModel(Breeding)
  breedModel: Repository<Breeding>; // 注入实体模型

  @Post('/list')
  async list(@Body() filter: any) {
    const res = await this.breedModel.find({
      where: {
        boarId: filter?.boarId,
        sowID: filter?.sowId,
        status: filter?.status,
      },
    }); // 查询数据
    return this.utils.send(this.ctx, '查询列表成功', 200, { data: res }); // 返回查询结果
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Breeding) {
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
  async add(@Body() breeding: Breeding) {
    let newBreeding = new Breeding(); // 创建新的养殖记录对象
    newBreeding = { ...breeding }; // 复制属性
    newBreeding.EhId = `EH${this.utils.getEmailCode()}`;
    await this.breedModel.save(newBreeding); // 保存新增的养殖记录
    return this.utils.send(this.ctx, '新增成功'); // 返回新增成功信息
  }
}
