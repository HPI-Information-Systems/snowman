import { Dataset } from 'api';

export interface DatasetsAppStateProps {
  selectedTags: string[];
}

export interface DatasetAppOwnProps {
  datasets: Dataset[];
}

export interface DatasetsAppDispatchProps {
  clickOnTag(aTag: string): void;
}

export type DatasetsAppProps = DatasetAppOwnProps &
  DatasetsAppDispatchProps &
  DatasetsAppStateProps;
