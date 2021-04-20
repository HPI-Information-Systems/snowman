import {
  DatasetId,
  ExperimentConfigItem,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../server/types';
import { BenchmarkCacheBaseConfig } from './types';

function stringifyExperiment(experiment: ExperimentId): string {
  return `e${experiment}E`;
}

function stringifySimilarityFunction(
  func: SimilarityThresholdFunctionId
): string {
  return `s${func}S`;
}

function stringifyDataset(dataset: DatasetId): string {
  return `d${dataset}D`;
}

function stringifyExperimentConfigItems(items: ExperimentConfigItem[]): string {
  return items
    .map(
      ({ experimentId, similarity }) =>
        `${stringifyExperiment(experimentId)}${
          similarity
            ? `:${stringifySimilarityFunction(similarity.func)}=${
                similarity.threshold
              }`
            : ''
        }`
    )
    .join('&');
}

export function keyOfBaseConfig(
  config: BenchmarkCacheBaseConfig,
  keyPrefix: string
): string {
  return `${keyPrefix}-${stringifyDataset(
    config.datasetId
  )}-${stringifyExperimentConfigItems(
    config.group1
  )}-${stringifyExperimentConfigItems(config.group2)}`;
}
