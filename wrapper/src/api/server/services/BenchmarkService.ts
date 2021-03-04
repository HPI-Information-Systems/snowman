import { getProviders } from '../../providers';
import {
  ExperimentId,
  ExperimentIntersection,
  ExperimentIntersectionCount,
  ExperimentIntersectionMode,
  ExperimentIntersectionPairCountsItem,
  ExperimentIntersectionPairCountsRequestExperiments,
  ExperimentIntersectionRequestExperiments,
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
  body: config,
  mode = ExperimentIntersectionMode.Pairs,
}: {
  body: ExperimentIntersectionRequestExperiments[];
  mode?: ExperimentIntersectionMode;
}): Promise<SuccessResponse<ExperimentIntersectionCount>> {
  return Service.response(
    () =>
      provider().calculateExperimentIntersectionCount({
        config,
        mode,
      }),
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
  body: config,
  startAt,
  limit,
  sortBy,
  mode = ExperimentIntersectionMode.Pairs,
}: {
  body: ExperimentIntersectionRequestExperiments[];
  startAt?: number;
  limit?: number;
  sortBy?: string;
  mode?: ExperimentIntersectionMode;
}): Promise<SuccessResponse<ExperimentIntersection>> {
  return Service.response(
    () =>
      provider().calculateExperimentIntersectionRecords({
        config,
        startAt,
        limit,
        sortBy,
        mode,
      }),
    200,
    404
  );
}

export async function calculateExperimentIntersectionPairCounts({
  body: config,
}: {
  body: ExperimentIntersectionPairCountsRequestExperiments[];
}): Promise<SuccessResponse<ExperimentIntersectionPairCountsItem[]>> {
  return Service.response(
    () => provider().calculateExperimentIntersectionPairCounts(config),
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
    () => provider().getBinaryMetrics(experimentId1, experimentId2),
    200,
    400
  );
}
