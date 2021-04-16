import { Dataset } from 'api';

export interface DatasetCardStateProps {
  couldPreview: boolean;
}

export interface DatasetCardOwnProps {
  dataset: Dataset;
}

export interface DatasetCardDispatchProps {
  deleteDataset(): void;
  editDataset(): void;
  previewDataset(): void;
}

export type DatasetCardProps = DatasetCardStateProps &
  DatasetCardOwnProps &
  DatasetCardDispatchProps;
