import { Experiment, ExperimentIntersectionCount } from 'api';

export interface IntersectionStrategyModel {
  available: Experiment[];
  included: Experiment[];
  excluded: Experiment[];
  ignored: Experiment[];
  // experiments are guaranteed to be sorted by intersectionCountSorter (see IntersectionStoreActions.ts)
  counts: ExperimentIntersectionCount[];
}
