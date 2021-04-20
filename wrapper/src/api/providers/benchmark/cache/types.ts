import { DatasetId, ExperimentConfigItem } from '../../../server/types';

export type BenchmarkCacheBaseConfig = {
  group1: ExperimentConfigItem[];
  group2: ExperimentConfigItem[];
  datasetId: DatasetId;
};

export interface BenchmarkCacheContent<Config> {
  readonly config: Config;
  readonly size: number;
}
