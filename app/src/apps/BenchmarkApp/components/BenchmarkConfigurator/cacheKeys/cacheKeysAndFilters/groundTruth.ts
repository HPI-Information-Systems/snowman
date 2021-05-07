import { Experiment } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { datasetCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/dataset';
import { filterCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/filter';
import {
  filterBy,
  resolveEntity,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { DatasetConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';

export const groundTruthCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.groundTruth,
  [datasetMultiSelectId?: number],
  Experiment,
  'experiments'
>({
  keyBase: StoreCacheKeyBaseEnum.groundTruth,
  defaultArgs: [0],
  targetCache: () => 'experiments',
  filter: {
    dependsOn: (dataset) => [datasetCacheKeyAndFilter(dataset).cacheKey],
    viewFilters: () => [filterCacheKeyAndFilter('algorithms').cacheKey],
    filter: ({ action, currentSelection, state }) => {
      return filterBy({
        currentSelection,
        filterBy: [
          (action.optionalPayload as (
            | DatasetConfigurationModel
            | undefined
          )[])[0],
        ],
        entityToFilteredEntity: (experimentId) =>
          resolveEntity(experimentId, state.resources.experiments)?.datasetId,
      });
    },
    filterAvailableEntities: (state, experiments, dependsOn, viewFilters) => {
      const datasetFilter =
        state.config.datasets[serializeCacheKey(dependsOn[0])]?.targets[0];
      const algorithmFilter =
        state.config.experiments[serializeCacheKey(viewFilters[0])]?.targets ??
        [];
      return experiments.filter(
        ({ datasetId, algorithmId }) =>
          datasetFilter === datasetId &&
          (algorithmFilter.length === 0 ||
            algorithmFilter.includes(algorithmId))
      );
    },
  },
});
