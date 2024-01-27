import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { UtilsModule } from '../utils/Utils';
import { Context } from '@midwayjs/express';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pig } from '../entity/entities/Pig';
import { Repository } from 'typeorm';
import { PigService } from '../service/Pig.service';

@Controller('/pig')
export class PigController {
  @Inject()
  utils: UtilsModule;

  @Inject()
  ctx: Context;

  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  @Inject()
  pigService: PigService;

  @Get('/list')
  async list() {
    return await this.utils.send(this.ctx, '查询成功', 200, {
      data: await this.pigModel.find({}),
    });
  }

  @Post('/update')
  async update(@Body() pigData: Pig) {
    await this.pigService.update(pigData);
    return this.utils.send(this.ctx, '修改成功');
  }
}
