import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreActionTypes } from 'apps/BenchmarkApp/types/ConfigurationStoreActionTypes';
import {
  ConfigurationCache,
  ConfigurationCacheItem,
  DatasetConfigurationModel,
  MultiSelectConfigurationModel,
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
    default:
      return state;
  }
};

export default ConfigurationStoreReducer;
