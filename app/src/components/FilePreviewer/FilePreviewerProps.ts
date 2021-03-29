import {TuplesLoader} from "components/DataViewer/TuplesLoader";

export interface FilePreviewerOwnProps {
  fileName: string;
}

export interface FilePreviewerStateProps {
  isOpen: boolean;
  rowCount: number;
}

export interface FilePreviewerDispatchProps {
  closeDialog(): void;
  loadTuples: TuplesLoader;
}

export type FilePreviewerProps = FilePreviewerOwnProps &
  FilePreviewerStateProps &
  FilePreviewerDispatchProps;
