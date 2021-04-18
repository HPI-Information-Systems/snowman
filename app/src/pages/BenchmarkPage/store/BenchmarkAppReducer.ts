import { BenchmarkAppModel } from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import { SnowmanAction } from 'store/messages';

const initialState: BenchmarkAppModel = {
  selectedExperiments: [],
};

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
