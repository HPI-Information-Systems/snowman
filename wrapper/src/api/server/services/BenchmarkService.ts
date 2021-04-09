import { providers } from '../../providers';
import {
  CalculateExperimentIntersectionCountRequest,
  CalculateExperimentIntersectionCountsRequest,
  CalculateExperimentIntersectionRecordsRequest,
  ExperimentConfigItemSimilarity,
  ExperimentIntersectionCount,
  FileResponse,
  GetBinaryMetricsRequest,
  Metric,
  SimilarityThresholdFunctionId,
} from '../types';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.benchmark;
}

export async function calculateExperimentIntersectionCount({
  intersection,
}: CalculateExperimentIntersectionCountRequest): Promise<
  SuccessResponse<ExperimentIntersectionCount>
> {
  return Service.response(
    () =>
      provider().calculateExperimentIntersectionCount({
        intersection,
      }),
    200,
    404
  );
}

export async function calculateExperimentIntersectionRecords({
  intersection,
  startAt,
  limit,
}: CalculateExperimentIntersectionRecordsRequest): Promise<
  SuccessResponse<FileResponse>
> {
  return Service.response(
    () =>
      provider().calculateExperimentIntersectionRecords({
        intersection,
        startAt,
        limit,
      }),
    200,
    404
  );
}

export async function calculateExperimentIntersectionCounts({
  experiments,
}: CalculateExperimentIntersectionCountsRequest): Promise<
  SuccessResponse<ExperimentIntersectionCount[]>
> {
  return Service.response(
    () => provider().calculateExperimentIntersectionCounts(experiments),
    200,
    404
  );
}

function getSimilarity(
  threshold?: number,
  func?: SimilarityThresholdFunctionId
): ExperimentConfigItemSimilarity | undefined {
  if (threshold !== undefined && func !== undefined) {
    return {
      func,
      threshold,
    };
  } else if (threshold !== undefined || func !== undefined) {
    throw new Error(
      'Similarity function and threshold must either both be set or omitted.'
    );
  } else {
    return undefined;
  }
}

export async function getBinaryMetrics({
  groundTruthExperimentId,
  predictedExperimentId,
  groundTruthSimilarityThreshold,
  groundTruthSimilarityThresholdFunction,
  predictedSimilarityThreshold,
  predictedSimilarityThresholdFunction,
}: GetBinaryMetricsRequest): Promise<SuccessResponse<Array<Metric>>> {
  return Service.response(
    () =>
      provider().getBinaryMetrics(
        {
          experimentId: groundTruthExperimentId,
          similarity: getSimilarity(
            groundTruthSimilarityThreshold,
            groundTruthSimilarityThresholdFunction
          ),
        },
        {
          experimentId: predictedExperimentId,
          similarity: getSimilarity(
            predictedSimilarityThreshold,
            predictedSimilarityThresholdFunction
          ),
        }
      ),
    200,
    400
  );
}
