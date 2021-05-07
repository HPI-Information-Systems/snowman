import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export interface MultiSelectorOwnProps {
  title: string;
  cacheKey: StoreCacheKey;
  allowMultiple?: boolean;
}

export type MultiSelectorProps = MultiSelectorOwnProps;
