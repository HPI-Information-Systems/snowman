/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { Define, MakeRequired, Primitive, ValueOf } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

export type StoreCacheKey<
  Base extends StoreCacheKeyBaseEnum = StoreCacheKeyBaseEnum,
  Args extends Primitive[] = Primitive[]
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
  Args extends any[],
  Entity,
  TargetCache extends keyof ConfigurationStoreModel = keyof ConfigurationStoreModel
>({
  keyBase,
  defaultArgs,
  targetCache,
  filter,
}: {
  keyBase: KeyBase;
  defaultArgs: MakeRequired<Args>;
  targetCache: (...args: MakeRequired<Args>) => TargetCache;
  filter?: {
    dependsOn: (...args: MakeRequired<Args>) => StoreCacheKey[];
    viewFilters: (...args: MakeRequired<Args>) => StoreCacheKey[];
    filter: (
      event: FilterEvent<ModelOfCache<TargetCache>>,
      ...args: MakeRequired<Args>
    ) => (ModelOfCache<TargetCache> | undefined)[];
    filterAvailableEntities: (
      state: BenchmarkAppModel,
      entities: Entity[],
      dependsOn: StoreCacheKey[],
      viewFilters: StoreCacheKey[],
      ...args: MakeRequired<Args>
    ) => Entity[];
  };
}): ((
  ...args: Args
) => {
  cacheKey: StoreCacheKey<KeyBase, MakeRequired<Args>>;
  targetCache: TargetCache;
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
}) => (...incomingArgs) => {
  const longerArgs =
    incomingArgs.length > defaultArgs.length ? incomingArgs : defaultArgs;
  const args = longerArgs.map(
    (_, index) => incomingArgs[index] ?? defaultArgs[index]
  ) as MakeRequired<Args>;
  return {
    cacheKey: [keyBase, ...args],
    targetCache: targetCache(...args),
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
  };
};
