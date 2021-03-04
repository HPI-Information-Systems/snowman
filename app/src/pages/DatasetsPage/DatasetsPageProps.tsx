import { Option } from 'types/Option';

export interface DatasetsPageStateProps {
  tags: string[];
  datasets: Option[];
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
