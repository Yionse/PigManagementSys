// src/filter/globalMatch.filter.ts
import { Match } from '@midwayjs/core';
import { Context } from '@midwayjs/express';

@Match()
export class GlobalMatchFilter {
  // 写一个全局的返回中间件，可以自定义值等
  match(value: any, ctx: Context) {
    return {
      code: ctx.statusCode || 200,
      message: ctx.statusMessage || '请求成功',
      result: value,
    };
  }
}
