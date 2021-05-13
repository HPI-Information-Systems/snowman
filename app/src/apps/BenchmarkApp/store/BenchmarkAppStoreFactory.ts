import BenchmarkAppReducer from 'apps/BenchmarkApp/store/BenchmarkAppReducer';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const BenchmarkAppStoreMagistrate = new StoreMagistrate<BenchmarkAppModel>(
  'BenchmarkAppStore',
  BenchmarkAppReducer
);
