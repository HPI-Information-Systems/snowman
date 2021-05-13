import { ExperimentEntity } from 'types/ExperimentEntity';
import { TuplesLoader } from 'types/TuplesLoader';

export interface IntersectionStrategyStateProps {
  isValidConfig: boolean;
  loadTuples: TuplesLoader;
  tuplesCount: number;
  pairCount: number;
  countsLoaded: boolean;
  included: ExperimentEntity[];
  excluded: ExperimentEntity[];
  ignored: ExperimentEntity[];
}

export interface IntersectionStrategyDispatchProps {
  loadCounts(): void;
}

export type IntersectionStrategyProps = IntersectionStrategyStateProps &
  IntersectionStrategyDispatchProps;
