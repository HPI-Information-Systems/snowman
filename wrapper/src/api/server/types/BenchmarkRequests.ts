import {
  ExperimentConfigItem,
  ExperimentIntersectionItem,
  InlineObject,
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '.';

export interface CalculateDiagramDataRequest {
  xAxis: SoftKPIsAlgorithmEnum | MetricsEnum | SoftKPIsExperimentEnum;
  yAxis: SoftKPIsAlgorithmEnum | MetricsEnum | SoftKPIsExperimentEnum;
  diagram: InlineObject;
}

export interface CalculateExperimentIntersectionCountRequest {
  intersection: Array<ExperimentIntersectionItem>;
}

export interface CalculateExperimentIntersectionCountsRequest {
  experiments: Array<ExperimentConfigItem>;
}

export interface CalculateExperimentIntersectionRecordsRequest {
  intersection: Array<ExperimentIntersectionItem>;
  startAt?: number;
  limit?: number;
}

export interface GetBinaryMetricsRequest {
  groundTruthExperimentId: number;
  predictedExperimentId: number;
  groundTruthSimilarityThresholdFunction?: number;
  groundTruthSimilarityThreshold?: number;
  predictedSimilarityThresholdFunction?: number;
  predictedSimilarityThreshold?: number;
}
