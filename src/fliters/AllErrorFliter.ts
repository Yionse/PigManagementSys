// src/filter/all.filter.ts
import { Catch } from '@midwayjs/core';

@Catch()
export class AllErrorFilter {
  // 写一个全局错误中间件，返回500
  async catch(err: ErrorEventInit) {
    if (err) {
      return {
        code: 500,
        message: err.message,
      };
    }
  }
}
