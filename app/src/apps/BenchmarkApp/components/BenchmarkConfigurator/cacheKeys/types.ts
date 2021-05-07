/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { Define, NestedArray, ValueOf } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

export type StoreCacheKey<
  Base extends StoreCacheKeyBaseEnum = StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[] = NestedArray<
    string | number | null
  >[]
> = [Base, ...Args];

type FilterEvent<ConfigurationModel> = {
  state: BenchmarkAppModel;
  action: SnowmanAction;
  currentSelection: (ConfigurationModel | undefined)[];
};

export type ModelOfCache<
  Key extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel
> = Define<Define<ValueOf<ConfigurationStoreModel[Key]>>['targets'][number]>;

export const MakeStoreCacheKeyAndFilter = <
  KeyBase extends StoreCacheKeyBaseEnum,
  Args extends NestedArray<string | number | null>[],
  Entity extends SearchableEntity,
  TargetCache extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel
>({
  keyBase,
  targetCache,
  filter,
  getEntities,
}: {
  keyBase: KeyBase;
  targetCache: (...args: Args) => TargetCache;
  getEntities?: (state: BenchmarkAppModel) => Entity[];
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
}) => (...args) => ({
  cacheKey: [keyBase, ...args],
  targetCache: targetCache(...args),
  getEntities: getEntities ?? (() => []),
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
});
