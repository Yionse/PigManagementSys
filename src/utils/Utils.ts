import { Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Provide()
export class UtilsModule {
  send(ctx: Context, statusMessage?: string, code?: number, data?: any) {
    ctx.statusCode = code;
    ctx.statusMessage = statusMessage;
    return data || {};
  }
}
