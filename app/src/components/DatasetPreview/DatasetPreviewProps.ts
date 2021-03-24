export interface DatasetPreviewProps {
  closeDialog(): void;
  isOpen: boolean;
  datasetName: string;
  datasetId: number;
  rowCount: number;
}
