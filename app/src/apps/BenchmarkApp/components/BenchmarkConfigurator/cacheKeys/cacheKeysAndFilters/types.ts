/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { SelectorItem } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { getItemsUntyped } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { NestedArray } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

type FilterEvent<ConfigurationModel> = {
  state: BenchmarkAppModel;
  action: SnowmanAction;
  currentSelection: (ConfigurationModel | undefined)[];
};

type MakeStoreCacheKeyAndFilterArgs<
  KeyBase extends StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[],
  Entity extends SearchableEntity,
  TargetCache extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel,
  ResultT = ModelOfCache<TargetCache>[]
> = {
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
  selectorItems?: (
    state: BenchmarkAppModel,
    cacheKey: StoreCacheKey<KeyBase, Args>,
    ...args: Args
  ) => SelectorItem[];
  icon?: (...args: Args) => string;
  prepareSerialization?: (
    cacheKey: StoreCacheKey<KeyBase, Args>
  ) => StoreCacheKey;
};

type GetStoreCacheKeyAndFilter<
  KeyBase extends StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[],
  Entity extends SearchableEntity,
  TargetCache extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel,
  ResultT = ModelOfCache<TargetCache>[]
> = (
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
  getSelectorItems: (state: BenchmarkAppModel) => SelectorItem[];
  prepareSerialization: () => StoreCacheKey;
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
  selectorItems,
  prepareSerialization,
}: MakeStoreCacheKeyAndFilterArgs<
  KeyBase,
  Args,
  Entity,
  TargetCache,
  ResultT
>): GetStoreCacheKeyAndFilter<KeyBase, Args, Entity, TargetCache, ResultT> => (
  ...args
) => {
  const cacheKey = [keyBase, ...args] as StoreCacheKey<KeyBase, Args>;
  const result: ReturnType<
    GetStoreCacheKeyAndFilter<KeyBase, Args, Entity, TargetCache, ResultT>
  > = {
    cacheKey,
    targetCache: targetCache(...args),
    prepareSerialization: () =>
      prepareSerialization ? prepareSerialization(cacheKey) : cacheKey,
    getEntities: (state) => (getEntities ?? (() => []))(state, ...args),
    getSelectorItems: (state) => {
      if (selectorItems) {
        return selectorItems(state, cacheKey, ...args);
      } else {
        const entities = result.getEntities(state);
        const s1 = (result.getValue(state) as unknown) as number[];
        const s2 = s1
          .map((id) => entities.find((e) => id === e.id))
          .filter(
            (entity: Entity | undefined): entity is Entity =>
              entity !== undefined
          );
        const s3 = s2.map(
          (entity) =>
            ({
              icon: result.icon ? result.icon() : '',
              title: entity.name,
              indent: 0,
            } as SelectorItem)
        );
        return s3;
      }
    },
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
  return result;
};
