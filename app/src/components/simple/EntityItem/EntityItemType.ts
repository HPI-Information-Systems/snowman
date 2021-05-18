import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';
import { analytics, fileTrayFull, flask, hardwareChip } from 'ionicons/icons';
import { assertType } from 'snowman-library';

export enum EntityItemType {
  MATCHING_SOLUTION,
  EXPERIMENT,
  DATASET,
  SIM_FUNC,
}

export type EntityItemTypes =
  | Experiment
  | Algorithm
  | Dataset
  | SimilarityThresholdFunction;

export type EntityOfEntityItemType<
  ItemType extends EntityItemType
> = ItemType extends EntityItemType.MATCHING_SOLUTION
  ? Algorithm
  : ItemType extends EntityItemType.EXPERIMENT
  ? Experiment
  : ItemType extends EntityItemType.DATASET
  ? Dataset
  : ItemType extends EntityItemType.SIM_FUNC
  ? SimilarityThresholdFunction
  : never;

export const entityItemIcon = assertType<Record<EntityItemType, string>>()({
  [EntityItemType.EXPERIMENT]: flask,
  [EntityItemType.DATASET]: fileTrayFull,
  [EntityItemType.MATCHING_SOLUTION]: hardwareChip,
  [EntityItemType.SIM_FUNC]: analytics,
});
