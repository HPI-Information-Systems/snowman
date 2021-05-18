import { SimilarityThresholdFunction } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { experimentCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/experiment';
import { groundTruthCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/groundTruth';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import {
  filterBy,
  resolveEntity,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { ExperimentConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';

export const simFuntionCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.similarityFunction,
  | [datasetMultiSelectId: number, experimentMultiSelectId: number]
  | [datasetMultiSelectId: number],
  SimilarityThresholdFunction,
  'simFunctions'
>({
  keyBase: StoreCacheKeyBaseEnum.similarityFunction,
  targetCache: () => 'simFunctions',
  getEntities: (state, ..._) => state.resources.simFunctions,
  filter: {
    dependsOn: (dataset, experiment?) =>
      experiment === undefined
        ? [groundTruthCacheKeyAndFilter(dataset).cacheKey]
        : [experimentCacheKeyAndFilter(dataset, experiment).cacheKey],
    viewFilters: () => [],
    filter: ({ action, currentSelection, state }, _, ..._2) => {
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
    filterAvailableEntities: (
      state,
      funcs,
      dependsOn,
      _viewFilters,
      _,
      ..._2
    ) => {
      return funcs.filter(
        ({ experimentId }) =>
          state.config.experiments[serializeCacheKey(dependsOn[0])]
            ?.targets[0] === experimentId
      );
    },
  },
  itemType: () => EntityItemType.SIM_FUNC,
});
