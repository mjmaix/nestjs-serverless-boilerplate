import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { DogsService } from './dogs.service';

@Module({
  providers: [LazyModuleLoader, DogsService],
})
export class DogsModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
