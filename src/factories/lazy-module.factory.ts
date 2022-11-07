import { LazyModuleLoader, ModuleRef } from '@nestjs/core';

import { CatsModule } from '../domains/cats/cats.module';
import { DogsModule } from '../domains/dogs/dogs.module';

export enum LazyModuleKey {
  Cats = 'cats',
  Dogs = 'dogs',
}

type Modules = typeof CatsModule | typeof DogsModule;

export class LazyModuleFactory {
  public static factory = new LazyModuleFactory();

  private moduleInstances = new Map<LazyModuleKey, ModuleRef>();

  public async generate(moduleKey: LazyModuleKey, loader: LazyModuleLoader) {
    if (!LazyModuleFactory.factory) {
      LazyModuleFactory.factory = new LazyModuleFactory();
    }
    let _module = this.moduleInstances.get(moduleKey);
    let moduleCls: Modules;
    if (_module) {
      // cached
      return _module;
    } else {
      switch (moduleKey) {
        case LazyModuleKey.Cats:
          moduleCls = CatsModule;
          break;

        case LazyModuleKey.Dogs:
          moduleCls = DogsModule;
          break;

        default:
          throw new Error('Module factory missing');
      }
    }

    const moduleRef = await loader.load(() => moduleCls);
    _module = moduleRef;
    this.moduleInstances.set(moduleKey, _module);

    return _module;
  }
}
