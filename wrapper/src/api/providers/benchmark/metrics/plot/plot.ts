import {
  DatasetId,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../../server/types';
import { InstantiableAbstractClass } from '../../../../tools/types';
import { BaseMetric } from '../base';
import {
  plotSimilarityConfusionMatrix,
  PlotSimilarityConfusionMatrixResult,
} from './similarityConfusionMatrix';

export type PlotArgs = {
  datasetId: DatasetId;
  experimentId: ExperimentId;
  func: SimilarityThresholdFunctionId;
  groundTruth: ExperimentId[];
  X: InstantiableAbstractClass<typeof BaseMetric> | 'similarity';
  Y: InstantiableAbstractClass<typeof BaseMetric> | 'similarity';
  steps: number;
};
export type PlotResult = {
  threshold: number;
  x: number;
  y: number;
}[];

function extractValue(
  { threshold, ...matrix }: PlotSimilarityConfusionMatrixResult[number],
  AxisValue: PlotArgs['X']
): number {
  return AxisValue === 'similarity' ? threshold : new AxisValue(matrix).value;
}

export function plot({ X, Y, ...args }: PlotArgs): PlotResult {
  return plotSimilarityConfusionMatrix(args)
    .map((result) => ({
      threshold: result.threshold,
      x: extractValue(result, X),
      y: extractValue(result, Y),
    }))
    .sort(({ x: x1 }, { x: x2 }) => x1 - x2);
}
