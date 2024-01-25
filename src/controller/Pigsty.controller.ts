import { Get, Inject, Provide } from '@midwayjs/core';
import { PigstyService } from '../service/Pigsty.service';

@Provide('/pigsty')
export class PigstyController {
  @Inject()
  pigstyService: PigstyService;

  @Get('/list')
  async list() {
    console.log(await this.pigstyService.list());

    // return {
    //   data: await this.pigstyModel.find({}),
    // };
  }
}
