import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';
import ConfigurationStoreReducer from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreReducer';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppModel,
  BenchmarkAppResourcesStore,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanAction } from 'types/SnowmanAction';

const initialResourcesState: BenchmarkAppResourcesStore = {
  algorithms: [],
  datasets: [],
  experiments: [],
  simFunctions: [],
};

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
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        resources: {
          ...state.resources,
          algorithms: action.payload as Algorithm[],
        },
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        resources: {
          ...state.resources,
          datasets: action.payload as Dataset[],
        },
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        resources: {
          ...state.resources,
          experiments: action.payload as Experiment[],
        },
      };
    case BenchmarkAppActionsTypes.SET_SIM_FUNCTIONS:
      return {
        ...state,
        resources: {
          ...state.resources,
          simFunctions: action.payload as SimilarityThresholdFunction[],
        },
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
