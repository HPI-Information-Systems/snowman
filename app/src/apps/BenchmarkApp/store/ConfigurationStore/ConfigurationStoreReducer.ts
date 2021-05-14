import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import {
  ModelOfCache,
  StoreCacheKey,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import {
  ConfigurationCache,
  ConfigurationCacheItem,
  ConfigurationStoreModel,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { produce } from 'immer';
import { Define, ValueOf } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

const getItem = <Cache extends ValueOf<ConfigurationStoreModel>>({
  state,
  key,
  cache,
}: {
  state: BenchmarkAppModel;
  key: StoreCacheKey;
  cache: Cache;
}): Define<ValueOf<Cache>> => {
  const serializedKey = serializeCacheKey(key);
  let item = cache[serializedKey] as Define<ValueOf<Cache>>;
  if (!item) {
    item = {
      INTERNAL_cacheKey: key as Define<ValueOf<Cache>>['INTERNAL_cacheKey'],
      dependents: [] as Define<ValueOf<Cache>>['dependents'],
      targets: getCacheKeyAndFilter(key).createNew(state) as Define<
        ValueOf<Cache>
      >['targets'],
    } as Define<ValueOf<Cache>>;
    const { filter } = getCacheKeyAndFilter(key);
    if (filter) {
      for (const cacheKeyAndFilter of filter
        .dependsOn()
        .map((dependsOn: StoreCacheKey) => getCacheKeyAndFilter(dependsOn))) {
        getItem({
          state,
          key: cacheKeyAndFilter.cacheKey,
          cache: state.config[cacheKeyAndFilter.targetCache],
        }).dependents.push(key);
      }
    }
    (cache as ValueOf<ConfigurationStoreModel>)[serializedKey] = item;
  }
  return item;
};

const ConfigurationStoreReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case ConfigurationStoreActionTypes.SET_SELECTION:
      return produce(state, (state: BenchmarkAppModel) => {
        const key = action.payload as StoreCacheKey;
        const newSelection = action.optionalPayload as (
          | ModelOfCache<typeof cache>
          | undefined
        )[];
        const cache = getCacheKeyAndFilter(key).targetCache;
        const item = getItem({ state, cache: state.config[cache], key });
        item.targets = newSelection as typeof item.targets;
        for (const {
          cacheKey,
          targetCache,
          filter,
        } of item.dependents.map((dependent) =>
          getCacheKeyAndFilter(dependent)
        )) {
          if (filter) {
            const filteredEntity =
              state.config[targetCache][serializeCacheKey(cacheKey)];
            if (filteredEntity) {
              filteredEntity.targets = filter.filter({
                action,
                state,
                currentSelection: (filteredEntity.targets ??
                  getCacheKeyAndFilter(
                    filteredEntity.INTERNAL_cacheKey
                  ).createNew(
                    state
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  )) as any,
              }) as typeof filteredEntity.targets;
            }
          }
        }
      });
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
    case BenchmarkAppActionsTypes.SET_DATASETS:
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
    case BenchmarkAppActionsTypes.SET_SIM_FUNCTIONS:
      return produce(state, (state: BenchmarkAppModel) => {
        for (const item of (Object.values(
          state.config
        ) as ConfigurationCache<unknown>[])
          .flatMap((cache) => Object.values(cache))
          .filter(
            (
              value: ConfigurationCacheItem<unknown> | undefined
            ): value is ConfigurationCacheItem<unknown> => value !== undefined
          )) {
          const cacheKeyAndFilter = getCacheKeyAndFilter(
            item.INTERNAL_cacheKey
          );
          if (cacheKeyAndFilter.resourcesUpdated) {
            item.targets = cacheKeyAndFilter.resourcesUpdated(
              state
            ) as typeof item.targets;
          }
        }
        return state;
      });
    default:
      return state;
  }
};

export default ConfigurationStoreReducer;
