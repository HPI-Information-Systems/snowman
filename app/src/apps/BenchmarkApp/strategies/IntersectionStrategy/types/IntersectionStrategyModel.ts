import { ExperimentIntersectionCount } from 'api';
import { ExperimentEntity } from 'types/ExperimentEntity';

export interface IntersectionStrategyModel {
  available: ExperimentEntity[];
  included: ExperimentEntity[];
  excluded: ExperimentEntity[];
  ignored: ExperimentEntity[];
  // experiments are guaranteed to be sorted by intersectionCountSorter (see IntersectionStoreActions.ts)
  counts: ExperimentIntersectionCount[];
  isValidConfig: boolean;
}
