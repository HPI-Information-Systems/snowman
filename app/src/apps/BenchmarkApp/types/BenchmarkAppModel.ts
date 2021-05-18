import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export interface BenchmarkAppModel {
  resources: BenchmarkAppResourcesModel;
  activeStrategy: StrategyIDs;
  config: ConfigurationStoreModel;
}

export interface BenchmarkAppResourcesModel {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  simFunctions: SimilarityThresholdFunction[];
}

export type BenchmarkAppThunkAction<R> = SnowmanThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanDispatch<BenchmarkAppModel>;
