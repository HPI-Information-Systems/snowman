import { Experiment } from 'api';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';

export interface IntersectionPageStateProps {
  loadTuples: TuplesLoader;
  tuplesCount: number;
  pairCount: number;
  countsLoaded: boolean;
  included: Experiment[];
  excluded: Experiment[];
  irrelevant: Experiment[];
}

export interface IntersectionPageDispatchProps {
  loadCounts(): Promise<void>;
}

export type IntersectionPageProps = IntersectionPageStateProps &
  IntersectionPageDispatchProps;
