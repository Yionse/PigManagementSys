import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pig } from '../entity/entities/Pig';
import { Repository } from 'typeorm';
import { PigOptions } from '../interface';

@Provide()
export class PigService {
  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  async addPig(newPig: PigOptions) {
    let pig = new Pig();
    pig = { ...newPig };
    await this.pigModel.save(pig);
  }

  async queryPig() {
    const allPig = await this.pigModel.find({});
    console.log(allPig, 'service');
    return allPig;
  }
}
