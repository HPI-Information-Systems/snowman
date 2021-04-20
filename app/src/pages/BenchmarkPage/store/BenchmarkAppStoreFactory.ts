import BenchmarkAppReducer from 'pages/BenchmarkPage/store/BenchmarkAppReducer';
import { BenchmarkAppModel } from 'pages/BenchmarkPage/types/BenchmarkAppModel';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { constructStore } from 'utils/storeFactory';

export const createBenchmarkAppStore = (): Store<
  BenchmarkAppModel,
  SnowmanAction
> =>
  constructStore<BenchmarkAppModel>('BenchmarkAppStore', BenchmarkAppReducer);
