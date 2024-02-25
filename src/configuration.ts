import { Configuration, App } from '@midwayjs/core';
import * as express from '@midwayjs/express';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';
import { AllErrorFilter } from './fliters/AllErrorFliter';
import { GlobalMatchFilter } from './fliters/GlobalMatchFilter';
import * as crossDomain from '@midwayjs/cross-domain';

@Configuration({
  imports: [express, orm, crossDomain],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application;

  async onReady() {
    this.app.useFilter([AllErrorFilter, GlobalMatchFilter]);
  }
}
