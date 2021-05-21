import { DatasetId, ExperimentConfigItem } from '../../../../server/types';
import { CacheableConfusionMatrix } from '../../cacheableConfusionMatrix/cacheableConfusionMatrix';
import { BenchmarkCache } from '../cache';
import { BenchmarkCacheBaseConfig } from '../types';

export type ConfusionMatrixConfig = {
  predicted: ExperimentConfigItem[];
  groundTruth: ExperimentConfigItem[];
  datasetId: DatasetId;
  forceStatic?: boolean;
};

class ConfusionMatrixCacheClass extends BenchmarkCache<
  ConfusionMatrixConfig,
  CacheableConfusionMatrix
> {
  readonly keyPrefix = 'confusionMatrix';

  protected mapCustomConfigToBaseConfig({
    datasetId,
    groundTruth,
    predicted,
    forceStatic,
  }: ConfusionMatrixConfig): BenchmarkCacheBaseConfig {
    return {
      datasetId,
      group1: predicted,
      group2: groundTruth,
      forceStatic,
    };
  }
  protected mapBaseConfigToCustomConfig({
    datasetId,
    group1,
    group2,
    forceStatic,
  }: BenchmarkCacheBaseConfig): ConfusionMatrixConfig {
    return {
      datasetId,
      predicted: group1,
      groundTruth: group2,
      forceStatic,
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
