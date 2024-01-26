import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pigsty } from '../entity/entities/Pigsty';
import { Repository } from 'typeorm';

@Provide()
export class PigstyService {
  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  async add(newPigsty: Pigsty) {
    let pigsty = new Pigsty();
    pigsty = newPigsty;
    await this.pigstyModel.save(pigsty);
  }
}
