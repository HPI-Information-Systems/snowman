export interface ExperimentPreviewProps {
  closeDialog(): void;
  isOpen: boolean;
  experimentName: string;
  experimentId: number;
  rowCount: number;
}
