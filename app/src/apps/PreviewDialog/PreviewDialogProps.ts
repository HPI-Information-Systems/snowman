import { TuplesLoader } from 'types/TuplesLoader';

export interface PreviewDialogStateProps {
  fileName: string;
  rowCount: number;
  loadTuples: TuplesLoader;
}

export type PreviewDialogProps = PreviewDialogStateProps;
