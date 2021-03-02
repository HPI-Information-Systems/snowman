import { getProviders } from '../../providers';
import {
  ExperimentId,
  ExperimentIntersection,
  ExperimentIntersectionCount,
  ExperimentIntersectionMode,
  Metric,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return getProviders().benchmark;
}

/**
 * Triggers the comparison of multiple experiments and returns tuples classified as false_negative, etc. and limited by limit
 * intersects multiple experiments and returns the counts of the number of records. This can be used to calculate the confusion-matrix
 *
 * object List
 * returns ExperimentIntersectionCount
 * */
export async function calculateExperimentIntersectionCount({
  body,
  mode = ExperimentIntersectionMode.Pairs,
}: {
  body: {
    experimentId: ExperimentId;
    predictedCondition: boolean;
    similarityAttribute?: string;
    similarityScore?: number;
  }[];
  mode?: ExperimentIntersectionMode;
}): Promise<SuccessResponse<ExperimentIntersectionCount>> {
  return Service.response(
    () => {
      if (body.length === 2) {
        const tuples = provider().getConfusionTuples(
          body[0].experimentId,
          body[1].experimentId,
          body[0].predictedCondition,
          body[1].predictedCondition,
          mode
        ).data;
        return {
          numberGroups: tuples.reduce(
            (prev, cur) => prev + (cur.length === 0 ? 1 : 0),
            tuples.length === 0 ? 0 : 1
          ),
          numberRows: tuples.length,
        };
      } else {
        throw new Error(
          `Intersection for ${body.length} experiments is not supported so far! Please provide exactly two experiments`
        );
      }
    },
    200,
    404
  );
}

/**
 * Triggers the comparison of multiple experiments and returns tuples classified as false_negative, etc. and limited by limit
 * intersects multiple experiments and returns the resulting records. This can be used to calculate the confusion-matrix
 *
 * object List
 * startAt Integer  (optional)
 * limit Integer  (optional)
 * sortBy String  (optional)
 * returns String
 * */
export async function calculateExperimentIntersectionRecords({
  body,
  startAt,
  limit,
  sortBy,
  mode = ExperimentIntersectionMode.Pairs,
}: {
  body: {
    experimentId: ExperimentId;
    predictedCondition: boolean;
    similarityAttribute?: string;
    similarityScore?: number;
  }[];
  startAt?: number;
  limit?: number;
  sortBy?: string;
  mode?: ExperimentIntersectionMode;
}): Promise<SuccessResponse<ExperimentIntersection>> {
  return Service.response(
    () => {
      if (body.length === 2) {
        return provider().getConfusionTuples(
          body[0].experimentId,
          body[1].experimentId,
          body[0].predictedCondition,
          body[1].predictedCondition,
          mode
        );
      } else {
        throw new Error(
          `Intersection for ${body.length} experiments is not supported so far! Please provide exactly two experiments`
        );
      }
    },
    200,
    404
  );
}

/**
 * Compares two experiments and returns binary metrics
 *
 * experimentId1 Integer The id of an experiment
 * experimentId2 Integer The id of an experiment
 * similarityThresholdUnderscoreexperiment1 BigDecimal  (optional)
 * similarityAttributeUnderscoreexperiment1 String  (optional)
 * similarityThresholdUnderscoreexperiment2 BigDecimal  (optional)
 * similarityAttributeUnderscoreexperiment2 String  (optional)
 * returns Array<Metric>
 * */
export async function getBinaryMetrics({
  experimentId1,
  experimentId2,
  similarityThresholdUnderscoreexperiment1,
  similarityAttributeUnderscoreexperiment1,
  similarityThresholdUnderscoreexperiment2,
  similarityAttributeUnderscoreexperiment2,
}: {
  experimentId1: ExperimentId;
  experimentId2: ExperimentId;
  similarityThresholdUnderscoreexperiment1?: number;
  similarityAttributeUnderscoreexperiment1?: string;
  similarityThresholdUnderscoreexperiment2?: number;
  similarityAttributeUnderscoreexperiment2?: string;
}): Promise<SuccessResponse<Array<Metric>>> {
  return Service.response(
    () => provider().calculateMetrics(experimentId1, experimentId2),
    200,
    400
  );
}
