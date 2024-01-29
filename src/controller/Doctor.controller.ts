import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Doctors } from '../entity/entities/Doctors';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/express';
import { UtilsModule } from '../utils/Utils';

@Controller('/doctor')
export class DoctorController {
  @InjectEntityModel(Doctors)
  doctorsModel: Repository<Doctors>;

  @Inject()
  ctx: Context;

  @Inject()
  utils: UtilsModule;

  @Get('/list')
  async list() {
    const res = await this.doctorsModel.find({});
    console.log(res);
    return this.utils.send(this.ctx, '返回医生列表成功', 200, { data: res });
  }

  @Post('/add')
  async add(@Body('doctorName') doctorName: string) {
    const doctor = new Doctors();
    doctor.doctorName = doctorName;
    await this.doctorsModel.save(doctor);
    return this.utils.send(this.ctx, '新增成功');
  }

  @Post('/delete')
  async del(@Body('doctorId') doctorId: number) {
    await this.doctorsModel.delete(doctorId);
    return this.utils.send(this.ctx, '删除成功');
  }
}
