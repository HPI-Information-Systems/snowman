import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { CacheableConfusionMatrix } from '../../cacheableConfusionMatrix/cacheableConfusionMatrix';
import { BenchmarkCache } from '../cache';
import { BenchmarkCacheBaseConfig } from '../types';

export type ConfusionMatrixConfig = {
  predicted: ExperimentConfigItem[];
  groundTruth: ExperimentConfigItem[];
  datasetId: DatasetId;
};

class ConfusionMatrixCacheClass extends BenchmarkCache<
  ConfusionMatrixConfig,
  CacheableConfusionMatrix
> {
  readonly keyPrefix = 'confusionMatrix';

  protected mapCustomConfigToBaseConfig({
    datasetId,
    groundTruth: excluded,
    predicted: included,
  }: ConfusionMatrixConfig): BenchmarkCacheBaseConfig {
    return {
      datasetId,
      group1: included,
      group2: excluded,
    };
  }
  protected mapBaseConfigToCustomConfig({
    datasetId,
    group1,
    group2,
  }: BenchmarkCacheBaseConfig): ConfusionMatrixConfig {
    return {
      datasetId,
      predicted: group1,
      groundTruth: group2,
    };
  }

  protected create(
    config: ConfusionMatrixConfig,
    key: string
  ): CacheableConfusionMatrix {
    return new CacheableConfusionMatrix(config);
  }
}

export const ConfusionMatrixCache = new ConfusionMatrixCacheClass();
