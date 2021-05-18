import { Algorithm, Dataset, Experiment } from 'api';

export enum EntityItemType {
  MATCHING_SOLUTION,
  EXPERIMENT,
  DATASET,
}

export type EntityItemTypes = Experiment | Algorithm | Dataset;

export type EntityOfEntityItemType<
  ItemType extends EntityItemType
> = ItemType extends EntityItemType.MATCHING_SOLUTION
  ? Algorithm
  : ItemType extends EntityItemType.EXPERIMENT
  ? Experiment
  : ItemType extends EntityItemType.DATASET
  ? Dataset
  : never;
