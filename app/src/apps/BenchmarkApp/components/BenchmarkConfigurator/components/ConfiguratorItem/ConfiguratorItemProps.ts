import { GetCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';

export interface ConfiguratorItemOwnProps {
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export type ConfiguratorItemProps = ConfiguratorItemOwnProps;
