import { DatasetId, ExperimentConfigItem } from '../../../server/types';
import { IntersectionCache } from '../cache/flavors/intersectionCache';

export interface ConfusionMatrix {
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  trueNegatives: number;
}

export function calculateConfusionMatrix({
  datasetId,
  predicted,
  groundTruth,
}: {
  datasetId: DatasetId;
  predicted: ExperimentConfigItem[];
  groundTruth: ExperimentConfigItem[];
}): ConfusionMatrix {
  return {
    truePositives: IntersectionCache.get({
      datasetId,
      excluded: [],
      included: [...groundTruth, ...predicted],
    }).numberPairs,
    falsePositives: IntersectionCache.get({
      datasetId,
      excluded: [...groundTruth],
      included: [...predicted],
    }).numberPairs,
    falseNegatives: IntersectionCache.get({
      datasetId,
      excluded: [...predicted],
      included: [...groundTruth],
    }).numberPairs,
    trueNegatives: IntersectionCache.get({
      datasetId,
      excluded: [...groundTruth, ...predicted],
      included: [],
    }).numberPairs,
  };
}
