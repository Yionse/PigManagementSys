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

  // 获取当前种猪列表
  @Get('/list')
  async list() {
    return await this.utils.send(this.ctx, '查询成功', 200, {
      data: await this.pigModel.find({}),
    });
  }

  // 修改种猪信息
  @Post('/update')
  async update(@Body() pigData: Pig) {
    await this.pigService.update(pigData);
    return this.utils.send(this.ctx, '修改成功');
  }

  // 添加种猪信息
  @Post('/add')
  async add(@Body() PigData: Pig) {
    console.log(PigData, '1111');
    await this.pigService.add(PigData);
    return this.utils.send(this.ctx, '新增成功');
  }

  // 可带批量，所以batchId是一个数组
  @Post('/delete')
  async del(@Body() { batchId }: { batchId: number[] }) {
    await this.pigModel.delete(batchId);
    return this.utils.send(this.ctx, '删除成功');
  }
}
