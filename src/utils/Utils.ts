import { Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Provide()
export class UtilsModule {
  send(ctx: Context, statusMessage?: string, code?: number, data?: any) {
    ctx.statusCode = code;
    ctx.statusMessage = statusMessage;
    return data || {};
  }
  getEmailCode() {
    const min = 100000; // 最小值为100000
    const max = 999999; // 最大值为999999
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
