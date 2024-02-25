import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Pig } from '../entity/entities/Pig';
import { Exitrecord } from '../entity/entities/Exitrecord';
import { Pigsty } from '../entity/entities/Pigsty';
import { PigstyService } from './Pigsty.service';
import { UtilsModule } from '../utils/Utils';

@Provide()
export class PigService {
  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  @InjectEntityModel(Exitrecord)
  exit: Repository<Exitrecord>;

  @Inject()
  pigstyService: PigstyService;

  @Inject()
  utils: UtilsModule;

  // 修改种猪信息
  async update({ pigId, ...updateData }: any) {
    // 找到对应的实体
    const pig = await this.pigModel.findOne({ where: { pigId } });
    // 将新的信息覆盖旧的
    Object.assign(pig, updateData);
    if (updateData?.isExit) {
      await this.pigstyService.exit(updateData.pigstyId);
    }
    // 调用数据库实体进行保存操作
    await this.pigModel.save(pig);
  }

  // 添加种猪信息，操作与上部分类似
  async add(newPigData: Pig) {
    let pig = new Pig();
    pig = { ...newPigData };
    await this.pigstyService.entry(newPigData.pigstyId);
    await this.pigModel.save(pig);
  }
}
