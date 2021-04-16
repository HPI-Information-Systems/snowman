import { ExperimentValues } from './ExperimentValues';

export interface AddExperimentRequest {
  experiment: ExperimentValues;
}

export interface DeleteExperimentRequest {
  experimentId: number;
}

export interface GetExperimentRequest {
  experimentId: number;
}

export interface GetExperimentFileRequest {
  experimentId: number;
  similarityThresholdFunction?: number;
  similarityThreshold?: number;
  startAt?: number;
  limit?: number;
  sortBy?: string;
}

export interface SetExperimentRequest {
  experimentId: number;
  experiment: ExperimentValues;
}

export interface SetExperimentFileRequest {
  experimentId: number;
  format: SetExperimentFileFormatEnum;
  file: Blob;
  similarityThresholdFunction?: number;
  similarityThreshold?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum SetExperimentFileFormatEnum {
  Magellan = 'magellan',
  ClusterEr = 'clusterER',
  Pilot = 'pilot',
  Sigmod2021 = 'sigmod2021',
  Bhana = 'BHANA',
  Bpies = 'BPIES',
}
