import { TuplesLoader } from '../../components/DataViewer/TuplesLoader';

export interface IntersectionPageStateProps {
  loadTuples: TuplesLoader;
  tuplesCount: number;
  pairCount: number;
  includedExperimentNames: string[];
  excludedExperimentNames: string[];
}

export interface IntersectionPageDispatchProps {
  loadCounts(): void;
}

export type IntersectionPageProps = IntersectionPageStateProps &
  IntersectionPageDispatchProps;
