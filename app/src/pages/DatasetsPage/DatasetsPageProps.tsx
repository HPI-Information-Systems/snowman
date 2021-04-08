import { Dataset } from 'api';

export interface DatasetsPageStateProps {
  tags: string[];
  datasets: Dataset[];
  selectedTags: string[];
}

export interface DatasetsPageDispatchProps {
  clickOnTag(aTag: string): void;
  loadDatasets(): void;
}

export type DatasetsPageProps = DatasetsPageDispatchProps &
  DatasetsPageStateProps;
