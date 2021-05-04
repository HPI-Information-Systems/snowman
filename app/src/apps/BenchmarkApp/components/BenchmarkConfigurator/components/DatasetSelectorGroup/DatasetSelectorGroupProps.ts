import { Dataset } from 'api';
import { GetCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface DatasetSelectorItemOwnProps {
  getCacheKey: GetCacheKey;
  allowMultiple?: boolean;
}

export interface DatasetSelectorItemStateProps {
  selectedDatasets: Dataset[];
  datasets: Dataset[];
}

export interface DatasetSelectorItemDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type DatasetSelectorItemProps = DatasetSelectorItemOwnProps &
  DatasetSelectorItemStateProps &
  DatasetSelectorItemDispatchProps;
