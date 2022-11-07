import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { CatsApiController } from './cats-api.controller';

@Module({
  controllers: [CatsApiController],
})
export class CatsApiModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
