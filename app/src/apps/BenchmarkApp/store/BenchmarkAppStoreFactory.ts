import BenchmarkAppReducer from 'apps/BenchmarkApp/store/BenchmarkAppReducer';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { constructStore } from 'utils/storeFactory';

export const createBenchmarkAppStore = (): Store<
  BenchmarkAppModel,
  SnowmanAction
> =>
  constructStore<BenchmarkAppModel>('BenchmarkAppStore', BenchmarkAppReducer);
