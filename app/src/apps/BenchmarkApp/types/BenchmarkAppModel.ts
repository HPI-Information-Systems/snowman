import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import {
  SnowmanGenericDispatch,
  SnowmanGenericThunkAction,
} from 'store/messages';

export interface BenchmarkAppModel {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperimentIds: number[];
  expandedAlgorithmsInDatasets: ExpandedEntity[];
  searchString: string;
  usedStrategy: StrategyIDs;
}

export type BenchmarkAppThunkAction<R> = SnowmanGenericThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanGenericDispatch<BenchmarkAppModel>;
