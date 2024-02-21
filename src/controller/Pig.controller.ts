import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { UtilsModule } from '../utils/Utils'; // 引入工具模块
import { Context } from '@midwayjs/express';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pig } from '../entity/entities/Pig'; // 引入种猪实体模型
import { Repository } from 'typeorm';
import { PigService } from '../service/Pig.service'; // 引入种猪服务
import { Pigsty } from '../entity/entities/Pigsty'; // 引入猪舍实体模型
import { Entryrecord } from '../entity/entities/Entryrecord'; // 引入入栏记录实体模型
import { BreedType } from '../entity/entities/BreedType'; // 引入品种类型实体模型
import moment = require('moment'); // 引入moment.js库
import { Exitrecord } from '../entity/entities/Exitrecord'; // 引入出栏记录实体模型

@Controller('/pig')
export class PigController {
  @Inject()
  utils: UtilsModule; // 注入工具模块

  @Inject()
  ctx: Context; // 注入上下文对象

  @InjectEntityModel(Pig)
  pigModel: Repository<Pig>; // 注入种猪实体模型

  @InjectEntityModel(Pigsty)
  pigstyModel: Repository<Pigsty>; // 注入猪舍实体模型

  @InjectEntityModel(Entryrecord)
  entryModel: Repository<Entryrecord>; // 注入入栏记录实体模型

  @InjectEntityModel(Exitrecord)
  exitModel: Repository<Exitrecord>; // 注入出栏记录实体模型

  @InjectEntityModel(BreedType)
  breedTypeModel: Repository<BreedType>; // 注入品种类型实体模型

  @Inject()
  pigService: PigService; // 注入种猪服务

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
    await this.pigService.update(pigData); // 调用种猪服务更新种猪信息
    if (pigData?.isExit) {
      // 添加一条出栏记录
      const newExitrecord = new Exitrecord();
      newExitrecord.pigId = pigData.pigId;
      newExitrecord.exitReason = pigData?.exitReason || '卖出';
      newExitrecord.exitDate = moment().format('YYYY-MM-DD');
      await this.exitModel.save(newExitrecord); // 保存出栏记录
    }
    return this.utils.send(this.ctx, '修改成功'); // 返回修改成功信息
  }

  // 添加种猪信息
  @Post('/add')
  async add(@Body() PigData: any) {
    await this.pigService.add(PigData); // 调用种猪服务添加种猪信息
    const newEntryRecord = new Entryrecord();
    newEntryRecord.entryReason = PigData?.entryReason || '买入';
    newEntryRecord.entryDate = moment().format('YYYY-MM-DD');
    const pigList = await this.pigModel.find({
      where: { entryDate: moment().format('YYYY-MM-DD') },
    });
    newEntryRecord.pigId = pigList[pigList.length - 1]?.pigId;
    await this.entryModel.save(newEntryRecord); // 保存入栏记录
    return this.utils.send(this.ctx, '新增成功'); // 返回新增成功信息
  }

  // 可带批量，所以batchId是一个数组，也就是出栏操作
  @Post('/delete')
  async del(
    @Body()
    { batchId }: { batchId: number[] }
  ) {
    await this.pigModel.delete(batchId); // 根据ID删除种猪信息
    return this.utils.send(this.ctx, '删除成功'); // 返回删除成功信息
  }

  // 获取品种列表
  @Get('/breed')
  async breed() {
    return await this.breedTypeModel.find({}); // 查询品种列表
  }

  // 删除品种
  @Post('/breedDel')
  async breedDel(@Body('breedId') breedId: number) {
    await this.breedTypeModel.delete([breedId]); // 根据ID删除品种
    return this.utils.send(this.ctx, '删除品种成功'); // 返回删除成功信息
  }

  // 新增品种
  @Post('/breedAdd')
  async breedAdd(@Body('breedName') breedName: string) {
    const breedType = new BreedType();
    breedType.breedName = breedName;
    this.breedTypeModel.save(breedType); // 保存新增的品种
    return this.utils.send(this.ctx, '新增品种成功'); // 返回新增成功信息
  }
}
