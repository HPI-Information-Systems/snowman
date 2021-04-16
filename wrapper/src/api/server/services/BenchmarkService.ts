import { providers } from '../../providers';
import {
  CalculateExperimentIntersectionCountRequest,
  CalculateExperimentIntersectionCountsRequest,
  CalculateExperimentIntersectionRecordsRequest,
  ExperimentIntersectionCount,
  FileResponse,
  GetBinaryMetricsRequest,
  Metric,
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

export async function getBinaryMetrics({
  groundTruthExperimentId,
  predictedExperimentId,
}: GetBinaryMetricsRequest): Promise<SuccessResponse<Array<Metric>>> {
  return Service.response(
    () =>
      provider().getBinaryMetrics(
        groundTruthExperimentId,
        predictedExperimentId
      ),
    200,
    400
  );
}
