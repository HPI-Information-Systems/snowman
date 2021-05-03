import { Algorithm, Dataset, Experiment } from 'api';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export interface BenchmarkAppModel {
  resources: BenchmarkAppConfigStore;
  expandedAlgorithmsInDatasets: ExpandedEntity[];
  searchString: string;
  activeStrategy: StrategyIDs;
  config: ConfigurationStoreModel;
}

export interface BenchmarkAppConfigStore {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
  selectedExperimentIds: number[];
}

export type BenchmarkAppThunkAction<R> = SnowmanThunkAction<
  R,
  BenchmarkAppModel
>;

export type BenchmarkAppDispatch = SnowmanDispatch<BenchmarkAppModel>;
