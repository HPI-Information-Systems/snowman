import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import {
  AlgorithmConfigurationModel,
  ConfigurationCache,
  ConfigurationCacheItem,
  DatasetConfigurationModel,
  ExperimentConfigurationModel,
  ExperimentFilterModel,
  SimFunctionConfigurationModel,
  SimFunctionFilterModel,
  SimThresholdConfigurationModel,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { SnowmanAction } from 'types/SnowmanAction';

const filterEntities = <Entity extends { id: number }, Filter>({
  shouldResetEntity,
  filterApplies,
  allEntities,
  selected,
}: {
  shouldResetEntity: (entity: Entity, filter?: Filter) => boolean;
  filterApplies: (filter?: Filter) => boolean;
  allEntities: Entity[];
  selected: ConfigurationCache<number, Filter>;
}): ConfigurationCache<number, Filter> => {
  const allEntitiesMap = new Map(
    allEntities.map((target) => [target.id, target])
  );
  return Object.fromEntries(
    Object.entries(selected).map(([key, item]) => [
      key,
      filterApplies(item?.filter)
        ? ({
            filter: item?.filter,
            targets: item?.targets.filter((entityId) => {
              if (entityId !== undefined) {
                const entity = allEntitiesMap.get(entityId);
                if (
                  entity !== undefined &&
                  !shouldResetEntity(entity, item.filter)
                ) {
                  return true;
                }
              }
              return false;
            }),
          } as ConfigurationCacheItem<number, Filter>)
        : item,
    ])
  );
};

const ConfigurationStoreReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case ConfigurationStoreActionTypes.SET_DATASET_SELECTION: {
      const newSelection = action.optionalPayload as ConfigurationCacheItem<DatasetConfigurationModel>;
      const newSelectionTargets = new Set(newSelection.targets);
      return {
        ...state,
        config: {
          ...state.config,
          experiments: filterEntities({
            allEntities: state.resources.experiments,
            selected: state.config.experiments,
            filterApplies: (filter) =>
              filter?.forceDatasetFilter === action.payload,
            shouldResetEntity: ({ datasetId }, filter) =>
              !(filter?.allowMultipleDatasetFilter ?? true
                ? newSelectionTargets.has(datasetId)
                : datasetId === newSelection.targets[0]),
          }),
          datasets: {
            ...state.config.datasets,
            [action.payload as StoreCacheKey]: newSelection,
          },
        },
      };
    }
    case ConfigurationStoreActionTypes.SET_ALGORITHM_SELECTION: {
      const newSelection = action.optionalPayload as ConfigurationCacheItem<AlgorithmConfigurationModel>;
      const newSelectionTargets = new Set(newSelection.targets);
      return {
        ...state,
        config: {
          ...state.config,
          experiments: filterEntities({
            allEntities: state.resources.experiments,
            selected: state.config.experiments,
            filterApplies: (filter) =>
              filter?.forceAlgorithmFilter === action.payload,
            shouldResetEntity: ({ algorithmId }, filter) =>
              !(filter?.allowMultipleDatasetFilter ?? true
                ? newSelectionTargets.has(algorithmId)
                : algorithmId === newSelection.targets[0]),
          }),
          algorithms: {
            ...state.config.algorithms,
            [action.payload as StoreCacheKey]: action.optionalPayload as ConfigurationCacheItem<AlgorithmConfigurationModel>,
          },
        },
      };
    }
    case ConfigurationStoreActionTypes.SET_EXPERIMENT_SELECTION: {
      return {
        ...state,
        config: {
          ...state.config,
          experiments: {
            ...state.config.experiments,
            [action.payload as StoreCacheKey]: action.optionalPayload as ConfigurationCacheItem<
              ExperimentConfigurationModel,
              ExperimentFilterModel
            >,
          },
        },
      };
    }
    case ConfigurationStoreActionTypes.SET_SIM_FUNCTION_SELECTION: {
      return {
        ...state,
        config: {
          ...state.config,
          simFunctions: {
            ...state.config.simFunctions,
            [action.payload as StoreCacheKey]: action.optionalPayload as ConfigurationCacheItem<
              SimFunctionConfigurationModel,
              SimFunctionFilterModel
            >,
          },
        },
      };
    }
    case ConfigurationStoreActionTypes.SET_SIM_THRESHOLD_SELECTION: {
      return {
        ...state,
        config: {
          ...state.config,
          simThresholds: {
            ...state.config.simThresholds,
            [action.payload as StoreCacheKey]: action.optionalPayload as ConfigurationCacheItem<SimThresholdConfigurationModel>,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default ConfigurationStoreReducer;
