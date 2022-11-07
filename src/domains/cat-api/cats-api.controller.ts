import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { LazyModuleFactory, LazyModuleKey } from '../../factories/lazy-module.factory';
import { CreateCatDto } from '../cats/dto/create-cat.dto';
import { UpdateCatDto } from '../cats/dto/update-cat.dto';

@Controller('cats')
export class CatsApiController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const catsService = await this.lazyLoadCatsService();
    return catsService.create(createCatDto);
  }

  @Get('lazy')
  async lazy() {
    const catsService = await this.lazyLoadCatsService();
    return catsService.talk();
  }

  @Get()
  async findAll() {
    const catsService = await this.lazyLoadCatsService();
    return catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const catsService = await this.lazyLoadCatsService();
    return catsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    const catsService = await this.lazyLoadCatsService();
    return catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const catsService = await this.lazyLoadCatsService();
    return catsService.remove(+id);
  }

  private async lazyLoadCatsService() {
    const { CatsService } = await import('../cats/cats.service');
    const moduleRef = await LazyModuleFactory.factory.generate(LazyModuleKey.Cats, this.lazyModuleLoader);

    return moduleRef.get(CatsService);
  }
}
