import { TuplesLoader } from 'types/TuplesLoader';

export interface FilePreviewerStateProps {
  fileName: string;
  isOpen: boolean;
  rowCount: number;
  loadTuples: TuplesLoader;
}

export interface FilePreviewerDispatchProps {
  closeDialog(): void;
}

export type FilePreviewerProps = FilePreviewerStateProps &
  FilePreviewerDispatchProps;
