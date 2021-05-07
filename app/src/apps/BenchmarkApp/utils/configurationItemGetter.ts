import {
  getCacheKeyAndFilter,
  ModelOfCacheKeyBase,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';

export const getItemsUntyped = (
  aCacheKey: StoreCacheKey,
  state = BenchmarkAppStoreMagistrate.getStore().getState()
): (ModelOfCache | undefined)[] =>
  (state.config[getCacheKeyAndFilter(aCacheKey).targetCache][
    serializeCacheKey(aCacheKey)
  ]?.targets ?? []) as (ModelOfCache | undefined)[];

export const getItems = <Base extends StoreCacheKeyBaseEnum>(
  aCacheKey: StoreCacheKey<Base>,
  state?: BenchmarkAppModel
): (ModelOfCacheKeyBase<Base> | undefined)[] =>
  getItemsUntyped(aCacheKey, state) as (
    | ModelOfCacheKeyBase<Base>
    | undefined
  )[];

export const getDefinedItems = <Base extends StoreCacheKeyBaseEnum>(
  aCacheKey: StoreCacheKey<Base>,
  state?: BenchmarkAppModel
): ModelOfCacheKeyBase<Base>[] =>
  getItems(aCacheKey, state).filter(
    (
      item: ModelOfCacheKeyBase<Base> | undefined
    ): item is ModelOfCacheKeyBase<Base> => item !== undefined
  );

export const getSingleItem = <Base extends StoreCacheKeyBaseEnum>(
  aCacheKey: StoreCacheKey<Base>,
  state?: BenchmarkAppModel
): ModelOfCacheKeyBase<Base> | undefined => getItems(aCacheKey, state)[0];
