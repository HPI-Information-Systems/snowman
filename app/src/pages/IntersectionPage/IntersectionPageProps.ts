import { TuplesLoader } from '../../components/DataViewer/TuplesLoader';

export interface IntersectionPageStateProps {
  loadTuples: TuplesLoader;
  tuplesCount: number;
  pairCount: number;
  includedExperimentNames: string[];
  excludedExperimentNames: string[];
  countsLoaded: boolean;
}

export interface IntersectionPageDispatchProps {
  loadCounts(): Promise<void>;
}

export type IntersectionPageProps = IntersectionPageStateProps &
  IntersectionPageDispatchProps;
