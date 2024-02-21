import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { PigstyService } from '../service/Pigsty.service';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pigsty } from '../entity/entities/Pigsty';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

// 定义控制器，处理与猪圈相关的请求
@Controller('/pigsty')
export class PigstyController {
  // 注入 PigstyService 实例
  @Inject()
  pigstyService: PigstyService;

  // 注入 Pigsty 实体的 Repository
  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  // 注入 Express 的 Context 对象
  @Inject()
  ctx: Context;

  // 注入 UtilsModule 实例
  @Inject()
  utils: UtilsModule;

  // 处理 GET 请求，获取所有猪圈列表
  @Get('/list')
  async list() {
    return {
      data: await this.pigstyModel.find({}),
    };
  }

  // 处理 POST 请求，添加新的猪圈信息
  @Post('/add')
  async add(@Body() pigsty: Pigsty) {
    await this.pigstyService.add(pigsty);
    this.ctx.statusMessage = '添加成功';
    return {};
  }

  // 处理 POST 请求，删除指定猪圈
  @Post('/delete')
  async delete(@Body('pigstyId') pigstyId: string) {
    await this.pigstyModel.delete(pigstyId);
    this.ctx.statusMessage = '删除成功';
    return {};
  }

  // 处理 POST 请求，更新猪圈信息
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

  // 处理 POST 请求，猪进入指定猪圈
  @Post('/entry')
  async entry(@Body('pigstyId') pigstyId: number) {
    await this.pigstyService.entry(pigstyId);
    return this.utils.send(this.ctx, '入栏成功');
  }

  // 处理 POST 请求，猪离开指定猪圈
  @Post('/exit')
  async exit(@Body('pigstyId') pigstyId: number) {
    await this.pigstyService.exit(pigstyId);
    return this.utils.send(this.ctx, '出栏成功');
  }
}
