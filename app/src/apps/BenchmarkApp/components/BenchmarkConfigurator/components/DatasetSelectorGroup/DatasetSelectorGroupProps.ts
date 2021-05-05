import { Dataset } from 'api';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export interface DatasetSelectorGroupOwnProps {
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
}

export interface DatasetSelectorGroupStateProps {
  selectedDatasets: Dataset[];
  datasets: Dataset[];
}

export interface DatasetSelectorGroupDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type DatasetSelectorGroupProps = DatasetSelectorGroupOwnProps &
  DatasetSelectorGroupStateProps &
  DatasetSelectorGroupDispatchProps;
