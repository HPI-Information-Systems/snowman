import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface MultiSelectorOwnProps {
  title: string;
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
}

export type MultiSelectorProps = MultiSelectorOwnProps;
