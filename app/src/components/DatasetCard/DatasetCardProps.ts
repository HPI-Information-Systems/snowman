import { Dataset } from 'api';

export interface DatasetCardStateProps {
  isSelected: boolean;
  couldPreview: boolean;
}

export interface DatasetCardOwnProps {
  dataset: Dataset;
}

export interface DatasetCardDispatchProps {
  selectDataset(): void;
  deleteDataset(): void;
  editDataset(): void;
  previewDataset(): void;
}

export type DatasetCardProps = DatasetCardStateProps &
  DatasetCardOwnProps &
  DatasetCardDispatchProps;
