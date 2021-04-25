import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import {
  SnowmanGenericDispatch,
  SnowmanGenericThunkAction,
} from 'store/messages';

export interface BenchmarkAppModel {
  config: BenchmarkAppConfigStore;
  expandedAlgorithmsInDatasets: ExpandedEntity[];
  searchString: string;
  activeStrategy: StrategyIDs;
}

export interface BenchmarkAppConfigStore {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperimentIds: number[];
}

export type BenchmarkAppThunkAction<R> = SnowmanGenericThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanGenericDispatch<BenchmarkAppModel>;
