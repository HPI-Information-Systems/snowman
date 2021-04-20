import { DatasetId, ExperimentConfigItem } from '../../../server/types';

export type BenchmarkCacheBaseConfig<Config> = {
  group1: ExperimentConfigItem[];
  group2: ExperimentConfigItem[];
  datasetId: DatasetId;
  config: Config;
};

export interface BenchmarkCacheContent<Config> {
  readonly config: Config;
  readonly size: number;
  access(config: Config): void;
}
