import { SimilarityThresholdFunction } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { experimentCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/experiment';
import {
  filterBy,
  resolveEntity,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { ExperimentConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';

export const simFuntionCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityFunction,
  [datasetMultiSelectId?: number, experimentMultiSelectId?: number],
  SimilarityThresholdFunction,
  'simFunctions'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityFunction,
  defaultArgs: [0, 0],
  targetCache: () => 'simFunctions',
  filter: {
    dependsOn: (dataset, experiment) => [
      experimentCacheKeyAndFilter(dataset, experiment).cacheKey,
    ],
    viewFilters: () => [],
    filter: ({ action, currentSelection, state }) => {
      return filterBy({
        currentSelection,
        filterBy: [
          (action.optionalPayload as (
            | ExperimentConfigurationModel
            | undefined
          )[])[0],
        ],
        entityToFilteredEntity: (simFunctionId) =>
          resolveEntity(simFunctionId, state.resources.simFunctions)
            ?.experimentId,
      });
    },
    filterAvailableEntities: (state, funcs, dependsOn, _viewFilters) => {
      return funcs.filter(
        ({ experimentId }) =>
          state.config.experiments[serializeCacheKey(dependsOn[0])]
            ?.targets[0] === experimentId
      );
    },
  },
});
