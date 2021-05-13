import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';

export interface ConfiguratorItemOwnProps {
  configurators: [cacheKey: StoreCacheKey, allowMultiSelect: boolean][];
  title: string;
}

export type ConfiguratorItemProps = ConfiguratorItemOwnProps;
