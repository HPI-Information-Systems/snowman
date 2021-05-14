import { providers } from '../../providers';
import { getSimilarity } from '../../tools/getSimilarity';
import {
  CalculateDiagramDataRequest,
  CalculateExperimentIntersectionCountRequest,
  CalculateExperimentIntersectionCountsRequest,
  CalculateExperimentIntersectionRecordsRequest,
  ExperimentIntersectionCount,
  FileResponse,
  GetBinaryMetricsRequest,
  Metric,
} from '../types';
import { DiagramResponse } from '../types/DiagramResponse';
import { Service, SuccessResponse } from './Service';

function provider() {
  return providers.benchmark;
}

export async function calculateDiagramData({
  xAxis,
  yAxis,
  diagram,
}: CalculateDiagramDataRequest): Promise<SuccessResponse<DiagramResponse>> {
  return Service.response(
    () =>
      provider().calculateDiagramData({
        xAxis,
        yAxis,
        diagram,
      }),
    200,
    404
  );
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
