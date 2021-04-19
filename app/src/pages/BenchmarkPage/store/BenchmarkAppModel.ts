import { Algorithm, Dataset, Experiment } from 'api';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';
import { SnowmanGenericDispatch } from 'store/messages';

export interface BenchmarkAppModel {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperimentIds: number[];
  expandedAlgorithmsInDatasets: ExpandedEntity[];
  searchString: string;
}

export type BenchmarkAppDispatch = SnowmanGenericDispatch<BenchmarkAppModel>;
