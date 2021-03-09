import { ExperimentIntersection } from 'api';
import { TuplesLoader } from 'components/DataViewer/TuplesLoader';

export interface DataViewerOwnProps {
  tuplesCount: number;
  loadTuples: TuplesLoader;
}

export interface DataViewerStateProps {
  data: ExperimentIntersection;
}

export interface DataViewerDispatchProps {
  resetDataViewer(): void;
  handleLoadTuples({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }): Promise<void>;
}

export type DataViewerProps = DataViewerOwnProps &
  DataViewerStateProps &
  DataViewerDispatchProps;
