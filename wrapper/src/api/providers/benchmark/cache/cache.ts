import { InvalidatableBenchmarkCache } from './invalidatableCache';
import { BenchmarkCacheContent } from './types';

export abstract class BenchmarkCache<
  Config,
  Content extends BenchmarkCacheContent<Config>
> extends InvalidatableBenchmarkCache<Config, Content> {}
