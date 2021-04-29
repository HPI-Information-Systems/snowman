import { Experiment } from 'api';
import { TuplesLoader } from 'types/TuplesLoader';

export interface IntersectionStrategyStateProps {
  isValidConfig: boolean;
  loadTuples: TuplesLoader;
  tuplesCount: number;
  pairCount: number;
  countsLoaded: boolean;
  included: Experiment[];
  excluded: Experiment[];
  ignored: Experiment[];
}

export interface IntersectionStrategyDispatchProps {
  loadCounts(): void;
}

export type IntersectionStrategyProps = IntersectionStrategyStateProps &
  IntersectionStrategyDispatchProps;
