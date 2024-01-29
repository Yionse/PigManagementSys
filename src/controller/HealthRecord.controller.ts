import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Healthrecord } from '../entity/entities/Healthrecord';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

@Controller('/health')
export class HealthController {
  @InjectEntityModel(Healthrecord)
  healthModel: Repository<Healthrecord>;

  @Inject()
  ctx: Context;

  @Inject()
  utils: UtilsModule;

  @Get('/list')
  async list() {
    const res = await this.healthModel.find();
    return this.utils.send(this.ctx, '获取健康信息列表', 200, { data: res });
  }

  @Post('/add')
  async add(@Body() healthRecord: Healthrecord) {
    let newData = new Healthrecord();
    newData = {
      ...healthRecord,
    };
    await this.healthModel.save(newData);
    return this.utils.send(this.ctx, '新增成功');
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Healthrecord) {
    const newData = await this.healthModel.findOne({ where: { recordId } });
    Object.assign(newData, updateData);
    await this.healthModel.save(newData);
    return this.utils.send(this.ctx, '修改成功');
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.healthModel.delete(ids);
    return this.utils.send(this.ctx, '删除成功');
  }
}
