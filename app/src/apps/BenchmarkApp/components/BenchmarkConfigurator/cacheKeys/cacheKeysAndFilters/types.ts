/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import {
  EntitySelectorItem,
  SelectorItem,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { getItemsUntyped } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { NestedArray } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

export type SearchableEntity = { id: number; name: string };

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
      createNew: () => (ModelOfCache<TargetCache> | undefined)[],
      ...args: Args
    ) => (ModelOfCache<TargetCache> | undefined)[];
    filterAvailableEntities: (
      state: BenchmarkAppModel,
      entities: Entity[],
      dependsOn: StoreCacheKey[],
      viewFilters: StoreCacheKey[],
      cacheKey: StoreCacheKey<KeyBase, Args>,
      ...args: Args
    ) => Entity[];
  };
  selectorItems?: (
    state: BenchmarkAppModel,
    cacheKey: StoreCacheKey<KeyBase, Args>,
    ...args: Args
  ) => SelectorItem[];
  prepareSerialization?: (
    cacheKey: StoreCacheKey<KeyBase, Args>
  ) => StoreCacheKey;
  createNew?: (
    state: BenchmarkAppModel,
    dependsOn: StoreCacheKey[]
  ) => (ModelOfCache<TargetCache> | undefined)[];
  itemType?: (
    cacheKey: StoreCacheKey<KeyBase, Args>,
    ...args: Args
  ) => EntityItemType;
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
  getSelectorItems: (state: BenchmarkAppModel) => SelectorItem[];
  prepareSerialization: () => StoreCacheKey;
  resourcesUpdated:
    | ((state: BenchmarkAppModel) => (ModelOfCache<TargetCache> | undefined)[])
    | undefined;
  createNew: (
    state: BenchmarkAppModel
  ) => (ModelOfCache<TargetCache> | undefined)[];
  itemType?: () => EntityItemType;
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
  selectorItems,
  prepareSerialization,
  createNew,
  itemType,
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
        if (result.itemType) {
          const selectedIds = (result.getValue(state) as unknown) as number[];
          return selectedIds.map(
            (itemId) =>
              ({
                itemId,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                itemType: result.itemType!(),
                indent: 0,
              } as EntitySelectorItem)
          );
        } else {
          return [];
        }
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
            filter: (event) =>
              filter.filter(
                event,
                () => result.createNew(event.state),
                ...args
              ),
            filterAvailableEntities: (...args2) =>
              filter.filterAvailableEntities(
                ...args2,
                filter.dependsOn(...args),
                filter.viewFilters(...args),
                cacheKey,
                ...args
              ),
            dependsOn: () => filter.dependsOn(...args),
            viewFilters: () => filter.viewFilters(...args),
          },
        }
      : {}),
    resourcesUpdated: getEntities
      ? (state) => {
          const selection = result.getValue(state);
          if (
            Array.isArray(selection) &&
            selection.every(
              (item) => item === undefined || typeof item === 'number'
            )
          ) {
            const entities = result.getEntities(state);
            return (selection.filter(
              (item) => entities.find(({ id }) => id === item) !== undefined
            ) as unknown) as (ModelOfCache<TargetCache> | undefined)[];
          } else {
            return (selection as unknown) as (
              | ModelOfCache<TargetCache>
              | undefined
            )[];
          }
        }
      : undefined,
    createNew: createNew
      ? (state) => createNew(state, result.filter?.dependsOn() ?? [])
      : () => [],
    itemType: itemType ? () => itemType(cacheKey, ...args) : undefined,
  };
  return result;
};
