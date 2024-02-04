// src/filter/globalMatch.filter.ts
import { Match } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Match()
export class GlobalMatchFilter {
  match(value: any, ctx: Context) {
    return {
      code: ctx.statusCode || 200,
      message: ctx.statusMessage || '请求成功',
      result: value,
    };
  }
}
