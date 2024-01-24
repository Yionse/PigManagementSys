import { Controller, Get, Inject, Param, Post, Query } from '@midwayjs/core';
import { PigService } from '../service/pig.service';
import { Context } from '@midwayjs/express';

@Controller('/test')
export class Test {
  @Inject()
  ctx: Context;

  @Inject()
  pigService: PigService;

  @Post('/add')
  async addPig() {
    await this.pigService.addPig({
      pigId: 4,
      pigstyId: 1,
      breed: '1234',
      gender: '1234',
      birthDate: '2022-10-01',
      entryDate: '2022-10-04',
      exitDate: '2023-10-09',
      otherInfo: '123123',
    });
    const res = await this.pigService.queryPig();
    console.log(res, 'controller');
  }

  @Get('/adds')
  async test2(@Query() data: any) {
    console.log(data);
  }

  @Get('/add/:uid')
  async test(@Param('uid') uid: number) {
    console.log(uid);
  }
}
