import { TuplesLoader } from 'components/DataViewer/TuplesLoader';

export type DataViewerProps = {
  tuplesCount: number;
  loadTuples: TuplesLoader;
  BATCH_SIZE?: number;
};
