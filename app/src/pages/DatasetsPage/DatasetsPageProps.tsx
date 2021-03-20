import { Dataset } from 'api';

export interface DatasetsPageStateProps {
  tags: string[];
  datasets: Dataset[];
  selectedTags: string[];
  selectedDataset: number[];
}

export interface DatasetsPageDispatchProps {
  clickOnTag(aTag: string): void;
  clickOnDataset(aDatasetId: number): void;
  loadDatasets(): void;
  deleteDataset(aDatasetId: number): void;
  editDataset(aDatasetId: number): void;
}

export type DatasetsPageProps = DatasetsPageDispatchProps &
  DatasetsPageStateProps;
