import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsApiModule } from './domains/cat-api/cats-api.module';
import { DogsApiModule } from './domains/dog-api/dogs-api.module';
import { ZooModule } from './domains/zoo/zoo.module';

@Module({
  imports: [CatsApiModule, DogsApiModule, ZooModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
}
