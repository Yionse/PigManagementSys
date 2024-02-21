import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Doctors } from '../entity/entities/Doctors';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

@Controller('/doctor')
export class DoctorController {
  @InjectEntityModel(Doctors)
  doctorsModel: Repository<Doctors>; // 注入医生实体模型

  @Inject()
  ctx: Context; // 注入上下文对象

  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Get('/list')
  async list() {
    const res = await this.doctorsModel.find({}); // 查询医生列表
    return this.utils.send(this.ctx, '返回医生列表成功', 200, { data: res }); // 返回查询结果
  }

  @Post('/add')
  async add(@Body('doctorName') doctorName: string) {
    const doctor = new Doctors(); // 创建医生对象
    doctor.doctorName = doctorName; // 设置医生姓名
    await this.doctorsModel.save(doctor); // 保存新增的医生
    return this.utils.send(this.ctx, '新增成功'); // 返回新增成功信息
  }

  @Post('/delete')
  async del(@Body('doctorId') doctorId: number) {
    await this.doctorsModel.delete(doctorId); // 根据ID删除医生
    return this.utils.send(this.ctx, '删除成功'); // 返回删除成功信息
  }
}
