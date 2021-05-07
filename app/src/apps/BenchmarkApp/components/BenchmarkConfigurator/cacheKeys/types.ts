import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { Define, NestedArray, ValueOf } from 'snowman-library';

export type StoreCacheKey<
  Base extends StoreCacheKeyBaseEnum = StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[] = NestedArray<
    string | number | null
  >[]
> = [Base, ...Args];

export type ModelOfCache<
  Key extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel
> = Define<Define<ValueOf<ConfigurationStoreModel[Key]>>['targets'][number]>;
