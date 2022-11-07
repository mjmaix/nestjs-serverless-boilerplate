import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { DogsApiController } from './dogs-api.controller';

@Module({
  controllers: [DogsApiController],
})
export class DogsApiModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
