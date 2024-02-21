import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pigsty } from '../entity/entities/Pigsty';
import { Repository } from 'typeorm';

@Provide()
export class PigstyService {
  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>; // 注入猪舍实体模型的 Repository 对象

  async add(newPigsty: Pigsty) {
    let pigsty = new Pigsty(); // 创建一个新的猪舍对象
    pigsty = newPigsty; // 将传入的新猪舍对象赋值给新建的猪舍对象
    await this.pigstyModel.save(pigsty); // 保存新增的猪舍信息到数据库
  }

  async entry(pigstyId: number) {
    const pigsty = await this.pigstyModel.findOne({
      // 根据猪舍ID查找对应的猪舍信息
      where: { pigstyId },
    });
    pigsty.currentPopulation += 1; // 将当前猪只数量加一
    await this.pigstyModel.save(pigsty); // 更新猪舍信息到数据库
  }

  async exit(pigstyId: number) {
    const pigsty = await this.pigstyModel.findOne({
      // 根据猪舍ID查找对应的猪舍信息
      where: { pigstyId },
    });
    pigsty.currentPopulation -= 1; // 将当前猪只数量减一
    await this.pigstyModel.save(pigsty); // 更新猪舍信息到数据库
  }
}
