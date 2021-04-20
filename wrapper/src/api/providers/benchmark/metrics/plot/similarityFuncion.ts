import { tables } from '../../../../database';
import {
  DatasetId,
  ExperimentConfigItem,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../../server/types';
import { lerp } from '../../../../tools/lerp';
import { calculateConfusionMatrix, ConfusionMatrix } from '../confusionMatrix';

export type PlotSimilarityFunctionConfig = {
  datasetId: DatasetId;
  experimentId: ExperimentId;
  func: SimilarityThresholdFunctionId;
  groundTruth: ExperimentConfigItem[];
  minThreshold?: number;
  maxThreshold?: number;
  steps: number;
};

export type PlotSimilarityFunctionResult = ({
  threshold: number;
} & ConfusionMatrix)[];

export function plotSimilarityFunction({
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
}: PlotSimilarityFunctionConfig): PlotSimilarityFunctionResult {
  const matrices: PlotSimilarityFunctionResult = [];
  for (let step = 0; step < steps; ++step) {
    const threshold = lerp(maxThreshold, minThreshold, step / (steps - 1));
    matrices.push({
      threshold,
      ...calculateConfusionMatrix({
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
        groundTruth,
      }),
    });
  }
  return matrices;
}
