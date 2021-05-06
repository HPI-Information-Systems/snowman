import { Algorithm, Dataset, Experiment } from 'api';
import ConfigurationStoreReducer from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreReducer';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppModel,
  BenchmarkAppResourcesStore,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanAction } from 'types/SnowmanAction';

const initialConfigState: BenchmarkAppResourcesStore = {
  algorithms: [],
  datasets: [],
  experiments: [],
  selectedExperimentIds: [],
};

const initialState: BenchmarkAppModel = {
  resources: initialConfigState,
  expandedAlgorithmsInDatasets: [],
  searchString: '',
  activeStrategy: StrategyIDs.Dashboard,
  config: {
    datasets: {},
    algorithms: {},
    experiments: {},
    simFunctions: {},
    simThresholds: {},
  },
};

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  return ConfigurationStoreReducer(
    InternalBenchmarkAppReducer(state, action),
    action
  );
};

const InternalBenchmarkAppReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          algorithms: action.payload as Algorithm[],
        },
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          datasets: action.payload as Dataset[],
        },
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          experiments: action.payload as Experiment[],
        },
      };
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
