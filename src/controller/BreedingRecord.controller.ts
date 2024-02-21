import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Breedingrecord } from '../entity/entities/Breedingrecord';
@Controller('/breeding')
export class BreedingRecordController {
  @Inject()
  utils: UtilsModule;
  @Inject()
  ctx: Context;
  @InjectEntityModel(Breedingrecord)
  breedModel: Repository<Breedingrecord>;

  @Get('/list')
  async list() {
    const res = await this.breedModel.find({});
    return this.utils.send(this.ctx, '查询列表成功', 200, { data: res });
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Breedingrecord) {
    const newModelData = await this.breedModel.findOne({ where: { recordId } });
    Object.assign(newModelData, updateData);
    await this.breedModel.save(newModelData);
    return this.utils.send(this.ctx, '修改成功');
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.breedModel.delete(ids);
    return this.utils.send(this.ctx, '删除成功');
  }

  @Post('/add')
  async add(@Body() breeding: Breedingrecord) {
    let newBreeding = new Breedingrecord();
    newBreeding = { ...breeding };
    await this.breedModel.save(newBreeding);
    return this.utils.send(this.ctx, '新增成功');
  }
}
