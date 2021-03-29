import { TuplesLoader } from 'types/TuplesLoader';

export type DataViewerProps = {
  tuplesCount: number;
  loadTuples: TuplesLoader;
  BATCH_SIZE?: number;
};
