import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { LazyModuleFactory, LazyModuleKey } from '../../factories/lazy-module.factory';
import { CreateZooDto } from './dto/create-zoo.dto';
import { UpdateZooDto } from './dto/update-zoo.dto';

@Injectable()
export class ZooService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
    console.log(`${this.constructor.name} loaded`);
  }

  create(createZooDto: CreateZooDto) {
    return 'This action adds a new zoo';
  }

  findAll() {
    return `This action returns all zoo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zoo`;
  }

  update(id: number, updateZooDto: UpdateZooDto) {
    return `This action updates a #${id} zoo`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoo`;
  }

  async animalSounds() {
    const dogsService = await this.lazyLoadDogsService();
    const dogTalk = dogsService.talk();

    const catsService = await this.lazyLoadCatsService();
    const catTalk = catsService.talk();

    return {
      dogTalk,
      catTalk,
    };
  }

  private async lazyLoadDogsService() {
    const { DogsService } = await import('../dogs/dogs.service');
    const moduleRef = await LazyModuleFactory.factory.generate(LazyModuleKey.Dogs, this.lazyModuleLoader);

    return moduleRef.get(DogsService);
  }

  private async lazyLoadCatsService() {
    const { CatsService } = await import('../cats/cats.service');
    const moduleRef = await LazyModuleFactory.factory.generate(LazyModuleKey.Cats, this.lazyModuleLoader);

    return moduleRef.get(CatsService);
  }
}
