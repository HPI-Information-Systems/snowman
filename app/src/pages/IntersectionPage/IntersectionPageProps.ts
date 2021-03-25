import { TuplesLoader } from '../../components/DataViewer/TuplesLoader';

export interface IntersectionPageStateProps {
  loadTuples: TuplesLoader;
  tuplesCount: number;
}

export interface IntersectionPageDispatchProps {
  loadCounts(): void;
}

export type IntersectionPageProps = IntersectionPageStateProps &
  IntersectionPageDispatchProps;
