import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import {
  AlgorithmConfigurationModel,
  ConfigurationCacheItem,
  DatasetConfigurationModel,
  ExperimentConfigurationModel,
  ExperimentFilterModel,
  SimFunctionConfigurationModel,
  SimFunctionFilterModel,
  SimThresholdConfigurationModel,
} from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanAction } from 'types/SnowmanAction';

const ConfigurationStoreReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case ConfigurationStoreActionTypes.SET_DATASET_SELECTION: {
      return {
        ...state,
        config: {
          ...state.config,
          datasets: {
            ...state.config.datasets,
            [action.payload as StoreCacheKey]: action.optionalPayload as ConfigurationCacheItem<DatasetConfigurationModel>,
          },
        },
      };
    }
    case ConfigurationStoreActionTypes.SET_ALGORITHM_SELECTION: {
      return {
        ...state,
        config: {
          ...state.config,
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
    case ConfigurationStoreActionTypes.SET_FUNCTION_SELECTION: {
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
    case ConfigurationStoreActionTypes.SET_THRESHOLD_SELECTION: {
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
