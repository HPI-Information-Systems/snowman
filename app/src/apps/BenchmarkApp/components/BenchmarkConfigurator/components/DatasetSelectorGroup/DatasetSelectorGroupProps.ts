import { Dataset } from 'api';
import { GetCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface DatasetSelectorGroupOwnProps {
  getCacheKey: GetCacheKey;
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
