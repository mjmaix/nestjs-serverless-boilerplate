import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { ZooController } from './zoo.controller';
import { ZooService } from './zoo.service';

@Module({
  controllers: [ZooController],
  providers: [ZooService],
})
export class ZooModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }
}
