import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { UtilsModule } from '../utils/Utils';
import { Context } from '@midwayjs/express';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pig } from '../entity/entities/Pig';
import { Repository } from 'typeorm';
import { PigService } from '../service/Pig.service';
import { Pigsty } from '../entity/entities/Pigsty';
import { Entryrecord } from '../entity/entities/Entryrecord';
import { BreedType } from '../entity/entities/BreedType';
import moment = require('moment');
import { Exitrecord } from '../entity/entities/Exitrecord';

@Controller('/pig')
export class PigController {
  @Inject()
  utils: UtilsModule;

  @Inject()
  ctx: Context;

  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>;

  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>;

  @InjectEntityModel(Entryrecord)
  entryModel: Repository<Entryrecord>;

  @InjectEntityModel(Exitrecord)
  exitModel: Repository<Exitrecord>;

  @InjectEntityModel(BreedType)
  breedTypeModel: Repository<BreedType>;

  @Inject()
  pigService: PigService;

  // 获取当前种猪列表
  @Get('/list')
  async list() {
    return await this.utils.send(this.ctx, '查询成功', 200, {
      pig: await this.pigModel.find({}),
      pigsty: await this.pigstyModel.find({}),
    });
  }

  // 修改种猪信息
  @Post('/update')
  async update(@Body() pigData: any) {
    await this.pigService.update(pigData);
    if (pigData?.isExit) {
      // 添加一条出栏记录
      const newExitrecord = new Exitrecord();
      newExitrecord.pigId = pigData.pigId;
      newExitrecord.exitReason = pigData?.exitReason || '卖出';
      newExitrecord.exitDate = moment().format('YYYY-MM-DD');
      console.log(newExitrecord);
      await this.exitModel.save(newExitrecord);
    }
    return this.utils.send(this.ctx, '修改成功');
  }

  // 添加种猪信息
  @Post('/add')
  async add(@Body() PigData: any) {
    await this.pigService.add(PigData);
    const newEntryRecord = new Entryrecord();
    newEntryRecord.entryReason = PigData?.entryReason || '买入';
    newEntryRecord.entryDate = moment().format('YYYY-MM-DD');
    const pigList = await this.pigModel.find({
      where: { entryDate: moment().format('YYYY-MM-DD') },
    });
    newEntryRecord.pigId = pigList[pigList.length - 1]?.pigId;
    await this.entryModel.save(newEntryRecord);
    return this.utils.send(this.ctx, '新增成功');
  }

  // 可带批量，所以batchId是一个数组，也就是出栏操作
  @Post('/delete')
  async del(
    @Body()
    { batchId }: { batchId: number[] }
  ) {
    await this.pigModel.delete(batchId);
    return this.utils.send(this.ctx, '删除成功');
  }

  @Get('/breed')
  async breed() {
    return await this.breedTypeModel.find({});
  }

  @Post('/breedDel')
  async breedDel(@Body('breedId') breedId: number) {
    await this.breedTypeModel.delete([breedId]);
    return this.utils.send(this.ctx, '删除品种成功');
  }

  @Post('/breedAdd')
  async breedAdd(@Body('breedName') breedName: string) {
    const breedType = new BreedType();
    breedType.breedName = breedName;
    this.breedTypeModel.save(breedType);
    return this.utils.send(this.ctx, '新增品种成功');
  }
}
