import { TuplesLoader } from 'types/TuplesLoader';

export type DataViewerOwnProps = {
  tuplesCount: number;
  loadTuples: TuplesLoader;
  BATCH_SIZE?: number;
};

export type DataViewerDispatchProps = {
  wrapLoadTuples(
    loadTuples: TuplesLoader,
    start: number,
    stop: number
  ): ReturnType<TuplesLoader>;
};

export type DataViewerProps = DataViewerOwnProps & DataViewerDispatchProps;
