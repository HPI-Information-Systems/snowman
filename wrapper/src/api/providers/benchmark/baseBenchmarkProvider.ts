import {
  ExperimentIntersection,
  ExperimentIntersectionMode,
} from '../../server/types';
import { Metric } from '../../server/types';
export abstract class BaseBenchmarkProvider {
  abstract calculateMetrics(
    goldstandardId: number,
    experimentId: number
  ): Metric[];
  abstract getConfusionTuples(
    goldStandardId: number,
    experimentId: number,
    goldStandardDuplicates: boolean,
    experimentDuplicates: boolean,
    mode: ExperimentIntersectionMode
  ): ExperimentIntersection;
}
