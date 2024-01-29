import { Controller, Inject, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Entryrecord } from '../entity/entities/Entryrecord';

@Controller('/entry')
export class EntryController {
  @Inject()
  utils: UtilsModule;

  @Inject()
  ctx: Context;

  @InjectEntityModel(Entryrecord)
  model: Repository<Entryrecord>;

  @Get('/list')
  async list() {
    const res = await this.model.find({});
    return this.utils.send(this.ctx, '查询列表成功', 200, { data: res });
  }

  @Post('/add')
  async add(@Body() newData: Entryrecord) {
    let modelData = new Entryrecord();
    modelData = {
      ...newData,
    };
    await this.model.save(modelData);
    return this.utils.send(this.ctx, '添加成功');
  }

  @Post('/update')
  async update(@Body() { recordId, ...updateData }: Entryrecord) {
    const newModelData = await this.model.findOne({ where: { recordId } });
    Object.assign(newModelData, updateData);
    await this.model.save(newModelData);
    return this.utils.send(this.ctx, '修改成功');
  }

  @Post('/delete')
  async del(@Body('ids') ids: number[]) {
    await this.model.delete(ids);
    return this.utils.send(this.ctx, '删除成功');
  }
}
