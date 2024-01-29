import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Pig } from '../entity/entities/Pig';

@Provide()
export class PigService {
  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  // 修改种猪信息
  async update({ pigId, ...updateData }: Pig) {
    // 找到对应的实体
    const pig = await this.pigModel.findOne({ where: { pigId } });
    // 将新的信息覆盖旧的
    Object.assign(pig, updateData);
    // 调用数据库实体进行保存操作
    await this.pigModel.save(pig);
  }

  // 添加种猪信息，操作与上部分类似
  async add(newPigData: Pig) {
    let pig = new Pig();
    pig = { ...newPigData };
    await this.pigModel.save(pig);
  }
}
