import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { PigstyService } from '../service/Pigsty.service';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pigsty } from '../entity/entities/Pigsty';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

@Controller('/pigsty')
export class PigstyController {
  @Inject()
  pigstyService: PigstyService;

  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  @Inject()
  ctx: Context;

  @Inject()
  utils: UtilsModule;

  @Get('/list')
  async list() {
    return {
      data: await this.pigstyModel.find({}),
    };
  }

  @Post('/add')
  async add(@Body() pigsty: Pigsty) {
    await this.pigstyService.add(pigsty);
    this.ctx.statusMessage = '添加成功';
    return {};
  }

  @Post('/delete')
  async delete(@Body('pigstyId') pigstyId: string) {
    await this.pigstyModel.delete(pigstyId);
    this.ctx.statusMessage = '删除成功';
    return {};
  }

  @Post('/update')
  async update(
    @Body()
    { pigstyId, ...updateData }: Pigsty
  ) {
    let pigsty = await this.pigstyModel.findOne({
      where: { pigstyId },
    });
    Object.assign(pigsty, updateData);
    await this.pigstyModel.save(pigsty);
    return await this.utils.send(this.ctx, '修改成功');
  }
}
