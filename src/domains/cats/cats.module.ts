import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { CatsService } from './cats.service';

@Module({
  providers: [LazyModuleLoader, CatsService],
})
export class CatsModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
