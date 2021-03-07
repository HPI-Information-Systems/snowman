import {
  ExperimentIntersection,
  ExperimentIntersectionCount,
  ExperimentIntersectionPairCountsItem,
  ExperimentIntersectionPairCountsRequestExperiments,
  ExperimentIntersectionRequestExperiments,
} from '../../server/types';
import { Metric } from '../../server/types';
export abstract class BaseBenchmarkProvider {
  abstract getBinaryMetrics(
    goldstandardId: number,
    experimentId: number
  ): Metric[];

  abstract calculateExperimentIntersectionCount(args: {
    config: ExperimentIntersectionRequestExperiments[];
  }): ExperimentIntersectionCount;

  abstract calculateExperimentIntersectionPairCounts(
    config: ExperimentIntersectionPairCountsRequestExperiments[]
  ): ExperimentIntersectionPairCountsItem[];

  abstract calculateExperimentIntersectionRecords(args: {
    config: ExperimentIntersectionRequestExperiments[];
    startAt?: number;
    limit?: number;
    sortBy?: string;
  }): ExperimentIntersection;
}
