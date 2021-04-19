import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';
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
}

export type BenchmarkAppThunkAction<R> = SnowmanGenericThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanGenericDispatch<BenchmarkAppModel>;
