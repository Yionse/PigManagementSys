import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pigsty } from '../entity/entities/Pigsty';
import { Repository } from 'typeorm';

@Provide()
export class PigstyService {
  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  async list() {
    return await this.pigstyModel.find({});
  }
}
