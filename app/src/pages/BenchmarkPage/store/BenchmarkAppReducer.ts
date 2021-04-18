import { Algorithm, Dataset, Experiment } from 'api';
import { BenchmarkAppActionsTypes } from 'pages/BenchmarkPage/store/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import { SnowmanAction } from 'store/messages';

const initialState: BenchmarkAppModel = {
  algorithms: [],
  datasets: [],
  experiments: [],
};

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        algorithms: action.payload as Algorithm[],
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        datasets: action.payload as Dataset[],
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        experiments: action.payload as Experiment[],
      };
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
