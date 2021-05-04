import { Algorithm, Dataset, Experiment } from 'api';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import { DatasetConfigurationModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { SnowmanAction } from 'types/SnowmanAction';

const ConfigurationStoreReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case ConfigurationStoreActionTypes.SET_DATASET_ID: {
      const datasets = { ...state.config.datasets };
      const dataset = datasets[action.payload as StoreCacheKey] ?? {};
      dataset.datasetId = action.optionalPayload as number | undefined;
      datasets[action.payload as StoreCacheKey] = dataset;
      return {
        ...state,
        config: {
          ...state.config,
          datasets,
        },
      };
    }
    case ConfigurationStoreActionTypes.CLEAR_DATASET:
      return {
        ...state,
        config: {
          ...state.config,
          datasets: Object.fromEntries(
            Object.entries(state.config.datasets).filter(
              ([key]) => key !== action.payload
            )
          ),
        },
      };
    default:
      return state;
  }
};

export default ConfigurationStoreReducer;
