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
  steps,
}: PlotSimilarityConfusionMatrixConfig): PlotSimilarityConfusionMatrixResult {
  const matrices: PlotSimilarityConfusionMatrixResult = [];
  const thresholds = getThresholds({ experimentId, func, steps });
  for (let step = 0; step < steps; ++step) {
    const threshold = thresholds[step];
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

function getThresholds({
  experimentId,
  func,
  steps,
}: {
  experimentId: ExperimentId;
  func: SimilarityThresholdFunctionId;
  steps: number;
}): number[] {
  const table = tables.experiment.similarityThresholdFunction(
    experimentId,
    func
  );
  const numberMerges = table.count();
  const thresholds: number[] = [];
  if (steps * Math.log(numberMerges) > numberMerges) {
    const similarities = table.all(
      {},
      {
        sortBy: [['similarity', 'DESC']],
        returnedColumns: ['similarity'],
        raw: true,
      }
    ) as [number][];
    for (let step = 0; step < steps; ++step) {
      thresholds.push(
        similarities[calculateMergeIndex({ numberMerges, step, steps })][0]
      );
    }
  } else {
    for (let step = 0; step < steps; ++step) {
      thresholds.push(
        table.get(
          {},
          {
            sortBy: [['similarity', 'DESC']],
            startAt: calculateMergeIndex({ numberMerges, step, steps }),
            limit: 1,
          }
        )?.similarity ?? 0
      );
    }
  }
  return thresholds;
}

function calculateMergeIndex({
  numberMerges,
  step,
  steps,
}: {
  numberMerges: number;
  step: number;
  steps: number;
}) {
  return Math.round(lerp(0, numberMerges - 1, step / Math.max(steps - 1, 1)));
}
