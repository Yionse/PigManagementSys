// src/filter/all.filter.ts
import { Catch } from '@midwayjs/core';

@Catch()
export class AllErrorFilter {
  async catch(err: ErrorEventInit) {
    if (err) {
      return {
        code: 500,
        message: err.message,
      };
    }
  }
}
