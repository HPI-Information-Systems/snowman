import { Algorithm, Dataset, Experiment } from 'api';
import {
  SnowmanGenericDispatch,
  SnowmanGenericThunkAction,
} from 'store/messages';

export interface BenchmarkAppModel {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export type BenchmarkAppThunkAction<R> = SnowmanGenericThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanGenericDispatch<BenchmarkAppModel>;
