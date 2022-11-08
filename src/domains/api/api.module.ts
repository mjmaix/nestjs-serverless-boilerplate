import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { CatsApiController } from './cats-api.controller';
import { DogsApiController } from './dogs-api.controller';

@Module({
  controllers: [CatsApiController, DogsApiController],
})
export class ApiModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
