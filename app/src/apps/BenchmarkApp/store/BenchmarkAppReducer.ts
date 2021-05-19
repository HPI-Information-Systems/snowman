import ConfigurationStoreReducer from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreReducer';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { initialResourcesState } from 'apps/SnowmanApp/store/CentralResourcesReducer';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialConfigState: ConfigurationStoreModel = {
  datasets: {},
  algorithms: {},
  experiments: {},
  simFunctions: {},
  simThresholds: {},
  multiSelects: {},
};

const initialState: BenchmarkAppModel = {
  resources: initialResourcesState,
  activeStrategy: StrategyIDs.Dashboard,
  config: initialConfigState,
};

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  // the order is important! benchmark resources reducer must come before configuration store reducer
  return ConfigurationStoreReducer(
    BenchmarkResourcesReducer(
      InternalBenchmarkAppReducer(state, action),
      action
    ),
    action
  );
};

const BenchmarkResourcesReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_RESOURCES:
      return {
        ...state,
        resources: action.payload as CentralResourcesModel,
      };
    default:
      return state;
  }
};

const InternalBenchmarkAppReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.OPEN_STRATEGY:
      return {
        ...state,
        activeStrategy: action.payload as StrategyIDs,
      };
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
