import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Pig } from '../entity/entities/Pig';

@Provide()
export class PigService {
  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  async update({ pigId, ...updateData }: Pig) {
    const pig = await this.pigModel.findOne({ where: { pigId } });
    Object.assign(pig, updateData);
    await this.pigModel.save(pig);
    return {};
  }
}
