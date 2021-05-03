import { Dataset } from 'api';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export interface DatasetSelectorItemStateProps {
  dataset: Dataset | undefined;
}

export interface DatasetSelectorItemDispatchProps {}

export interface DatasetSelectorItemOwnProps {
  cacheKey: StoreCacheKey;
}

export type DatasetSelectorItemProps = DatasetSelectorItemOwnProps &
  DatasetSelectorItemStateProps &
  DatasetSelectorItemDispatchProps;
