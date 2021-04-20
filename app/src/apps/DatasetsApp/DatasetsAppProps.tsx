import { Dataset } from 'api';

export interface DatasetsAppStateProps {
  selectedTags: string[];
  currentDatasets: Dataset[];
}

export interface DatasetAppOwnProps {
  datasets: Dataset[];
}

export interface DatasetsAppDispatchProps {
  clickOnTag(aTag: string): void;
  addDataset(): void;
}

export type DatasetsAppProps = DatasetAppOwnProps &
  DatasetsAppDispatchProps &
  DatasetsAppStateProps;
