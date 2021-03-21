import { Dataset } from 'api';

export interface DatasetsPageStateProps {
  tags: string[];
  datasets: Dataset[];
  selectedTags: string[];
  selectedDataset: number[];
}

export interface DatasetsPageDispatchProps {
  clickOnTag(aTag: string): void;
  clickOnDataset(aDataset: Dataset): void;
  loadDatasets(): void;
  deleteDataset(aDataset: Dataset): void;
  editDataset(aDataset: Dataset): void;
}

export type DatasetsPageProps = DatasetsPageDispatchProps &
  DatasetsPageStateProps;
