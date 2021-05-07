/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { getItemsUntyped } from 'apps/BenchmarkApp/utils/configurationItemGetter';
// import { getItemsUntyped } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { NestedArray } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

type FilterEvent<ConfigurationModel> = {
  state: BenchmarkAppModel;
  action: SnowmanAction;
  currentSelection: (ConfigurationModel | undefined)[];
};

export const MakeStoreCacheKeyAndFilter = <
  KeyBase extends StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[],
  Entity extends SearchableEntity,
  TargetCache extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel,
  ResultT = ModelOfCache<TargetCache>[]
>({
  keyBase,
  targetCache,
  filter,
  getEntities,
  getValue,
  icon,
}: {
  keyBase: KeyBase;
  targetCache: (...args: Args) => TargetCache;
  getEntities?: (state: BenchmarkAppModel, ...args: Args) => Entity[];
  getValue?: (
    state: BenchmarkAppModel,
    cacheKey: StoreCacheKey<KeyBase, Args>,
    ...args: Args
  ) => ResultT;
  filter?: {
    dependsOn: (...args: Args) => StoreCacheKey[];
    viewFilters: (...args: Args) => StoreCacheKey[];
    filter: (
      event: FilterEvent<ModelOfCache<TargetCache>>,
      ...args: Args
    ) => (ModelOfCache<TargetCache> | undefined)[];
    filterAvailableEntities: (
      state: BenchmarkAppModel,
      entities: Entity[],
      dependsOn: StoreCacheKey[],
      viewFilters: StoreCacheKey[],
      ...args: Args
    ) => Entity[];
  };
  icon?: (...args: Args) => string;
}): ((
  ...args: Args
) => {
  cacheKey: StoreCacheKey<KeyBase, Args>;
  targetCache: TargetCache;
  getEntities: (state: BenchmarkAppModel) => Entity[];
  filter?: {
    dependsOn: () => StoreCacheKey[];
    filter: (
      event: FilterEvent<ModelOfCache<TargetCache>>
    ) => (ModelOfCache<TargetCache> | undefined)[];
    filterAvailableEntities: (
      state: BenchmarkAppModel,
      entities: any[]
    ) => Entity[];
    viewFilters: () => StoreCacheKey[];
  };
  getValue: (state: BenchmarkAppModel) => ResultT;
  icon?: () => string;
}) => (...args) => {
  const cacheKey = [keyBase, ...args] as StoreCacheKey<KeyBase, Args>;
  return {
    cacheKey,
    targetCache: targetCache(...args),
    getEntities: (state) => (getEntities ?? (() => []))(state, ...args),
    getValue: (state) =>
      getValue
        ? getValue(state, cacheKey, ...args)
        : ((getItemsUntyped(cacheKey, state).filter(
            (item) => item !== undefined
          ) as unknown) as ResultT),
    ...(filter
      ? {
          filter: {
            filter: (...args2) => filter.filter(...args2, ...args),
            filterAvailableEntities: (...args2) =>
              filter.filterAvailableEntities(
                ...args2,
                filter.dependsOn(...args),
                filter.viewFilters(...args),
                ...args
              ),
            dependsOn: () => filter.dependsOn(...args),
            viewFilters: () => filter.viewFilters(...args),
          },
        }
      : {}),
    icon: icon ? () => icon(...args) : undefined,
  };
};
