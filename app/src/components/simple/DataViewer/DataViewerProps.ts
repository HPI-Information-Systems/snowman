import { TuplesLoader } from 'types/TuplesLoader';

export interface DataViewerOwnPropsNoTuplesLoader {
  tuplesCount: number;
  title: string;
  fileName?: string;
  BATCH_SIZE?: number;
}

export interface DataViewerOwnProps extends DataViewerOwnPropsNoTuplesLoader {
  loadTuples: TuplesLoader;
}

export type DataViewerProps = DataViewerOwnProps;
