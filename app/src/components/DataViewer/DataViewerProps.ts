import { TuplesLoader } from 'types/TuplesLoader';

export type DataViewerOwnPropsNoTuplesLoader = {
  tuplesCount: number;
  title: string;
  BATCH_SIZE?: number;
};

export type DataViewerOwnProps = DataViewerOwnPropsNoTuplesLoader & {
  loadTuples: TuplesLoader;
};

export type DataViewerDispatchProps = {
  wrapLoadTuples(
    loadTuples: TuplesLoader,
    start: number,
    stop: number
  ): ReturnType<TuplesLoader>;
};

export type DataViewerProps = DataViewerOwnProps & DataViewerDispatchProps;
