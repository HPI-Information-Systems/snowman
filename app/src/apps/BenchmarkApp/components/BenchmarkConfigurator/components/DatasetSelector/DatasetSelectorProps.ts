import { GetCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface DatasetSelectorOwnProps {
  getCacheKey: GetCacheKey;
}

export type DatasetSelectorProps = DatasetSelectorOwnProps;
