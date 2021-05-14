import { Algorithm, Dataset, Experiment } from 'api';

export enum EntityItemType {
  MATCHING_SOLUTION,
  EXPERIMENT,
  DATASET,
}

export type EntityItemTypes = Experiment | Algorithm | Dataset;
