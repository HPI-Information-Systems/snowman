import { tables } from '../../../../database';
import {
  DatasetId,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../../server/types';
import { lerp } from '../../../../tools/lerp';
import { ConfusionMatrixCache } from '../../cache/flavors/confusionMatrixCache';
import { ConfusionMatrix } from '../confusionMatrix';

export type PlotSimilarityConfusionMatrixConfig = {
  datasetId: DatasetId;
  experimentId: ExperimentId;
  func: SimilarityThresholdFunctionId;
  groundTruth: ExperimentId[];
  minThreshold?: number;
  maxThreshold?: number;
  steps: number;
};

export type PlotSimilarityConfusionMatrixResult = ({
  threshold: number;
} & ConfusionMatrix)[];

export function plotSimilarityConfusionMatrix({
  datasetId,
  experimentId,
  func,
  groundTruth,
  minThreshold = tables.experiment
    .similarityThresholdFunction(experimentId, func)
    .get(
      {},
      {
        sortBy: [['similarity', 'ASC']],
        startAt: 0,
        limit: 1,
      }
    )?.similarity ?? 0,
  maxThreshold = tables.experiment
    .similarityThresholdFunction(experimentId, func)
    .get({}, { sortBy: [['similarity', 'DESC']], startAt: 0, limit: 1 })
    ?.similarity ?? 0,
  steps,
}: PlotSimilarityConfusionMatrixConfig): PlotSimilarityConfusionMatrixResult {
  const matrices: PlotSimilarityConfusionMatrixResult = [];
  for (let step = 0; step < steps; ++step) {
    const threshold = lerp(
      maxThreshold,
      minThreshold,
      step / Math.max(steps - 1, 1)
    );
    matrices.push({
      threshold,
      ...ConfusionMatrixCache.get({
        datasetId,
        predicted: [
          {
            experimentId,
            similarity: {
              func,
              threshold,
            },
          },
        ],
        groundTruth: groundTruth.map((experimentId) => ({ experimentId })),
      }).confusionMatrix,
    });
  }
  return matrices;
}
