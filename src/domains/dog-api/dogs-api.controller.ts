import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { LazyModuleFactory, LazyModuleKey } from '../../factories/lazy-module.factory';
import { CreateDogDto } from '../dogs/dto/create-dog.dto';
import { UpdateDogDto } from '../dogs/dto/update-dog.dto';

@Controller('dogs')
export class DogsApiController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.create(createDogDto);
  }

  @Get('lazy')
  async lazy() {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.talk();
  }

  @Get()
  async findAll() {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dogsService = await this.lazyLoadDogsService();

    return dogsService.remove(+id);
  }

  private async lazyLoadDogsService() {
    const { DogsService } = await import('../dogs/dogs.service');
    const moduleRef = await LazyModuleFactory.factory.generate(LazyModuleKey.Dogs, this.lazyModuleLoader);

    return moduleRef.get(DogsService);
  }
}
