import { Experiment } from 'api';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { datasetCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/dataset';
import { filterCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/filter';
import { MakeStoreCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import {
  filterBy,
  resolveEntity,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { DatasetConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { flask } from 'ionicons/icons';
import { GoldStandardId } from 'snowman-library';

export const groundTruthCacheKeyAndFilter = MakeStoreCacheKeyAndFilter<
  StoreCacheKeyBaseEnum.groundTruth,
  [datasetMultiSelectId: number],
  Experiment,
  'experiments'
>({
  keyBase: StoreCacheKeyBaseEnum.groundTruth,
  targetCache: () => 'experiments',
  getEntities: (state) => state.resources.experiments,
  filter: {
    dependsOn: (dataset) => [datasetCacheKeyAndFilter(dataset).cacheKey],
    viewFilters: () => [filterCacheKeyAndFilter('algorithms').cacheKey],
    filter: ({ action, currentSelection, state }, createNew, ...args) => {
      const newSelection = filterBy({
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
      return newSelection.length === 0 ? createNew() : newSelection;
    },
    filterAvailableEntities: (state, experiments, dependsOn, viewFilters) => {
      const datasetFilter =
        state.config.datasets[serializeCacheKey(dependsOn[0])]?.targets[0];
      const algorithmFilter =
        state.config.algorithms[serializeCacheKey(viewFilters[0])]?.targets ??
        [];
      return experiments.filter(
        ({ datasetId, algorithmId }) =>
          datasetFilter === datasetId &&
          (algorithmFilter.length === 0 ||
            algorithmFilter.includes(algorithmId))
      );
    },
  },
  icon: () => flask,
  createNew: (state, dependsOn) => {
    const datasets =
      state.config.datasets[serializeCacheKey(dependsOn[0])]?.targets ?? [];
    const goldStandards = state.resources.experiments.filter(
      ({ datasetId, algorithmId }) =>
        algorithmId === GoldStandardId && datasets.includes(datasetId)
    );
    return goldStandards.length === 0 ? [] : [goldStandards[0].id];
  },
});
