import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';

export interface MultiSelectorOwnProps {
  title: string;
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
}

export type MultiSelectorProps = MultiSelectorOwnProps;
