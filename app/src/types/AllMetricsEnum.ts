import {
  MetricsEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from 'api';

export type AllMetricsEnum =
  | MetricsEnum
  | SoftKPIsAlgorithmEnum
  | SoftKPIsExperimentEnum;

export const AllMetricsObject = {
  ...MetricsEnum,
  ...SoftKPIsAlgorithmEnum,
  ...SoftKPIsAlgorithmEnum,
};
