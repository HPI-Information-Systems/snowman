import LRUCache from 'lru-cache';

import { ExperimentConfigItem } from '../../../server/types';
import { cliArgs } from '../../../tools/cli';
import { keyOfBaseConfig } from './keys';
import { BenchmarkCacheBaseConfig, BenchmarkCacheContent } from './types';

export abstract class BasicBenchmarkCache<
  Config,
  Content extends BenchmarkCacheContent<Config>
> {
  get(config: Config): Content {
    const baseConfig = this.sortConfig(
      this.mapCustomConfigToBaseConfig(config)
    );
    const key = keyOfBaseConfig(baseConfig, this.keyPrefix);
    let intersection = this.cache.get(key);
    if (!intersection) {
      intersection = this.createAndCache(baseConfig, key);
    }
    return intersection;
  }

  keyOf(config: Config): string {
    const baseConfig = this.mapCustomConfigToBaseConfig(config);
    return keyOfBaseConfig(baseConfig, this.keyPrefix);
  }

  protected abstract mapCustomConfigToBaseConfig(
    config: Config
  ): BenchmarkCacheBaseConfig;
  protected abstract mapBaseConfigToCustomConfig(
    config: BenchmarkCacheBaseConfig
  ): Config;
  protected abstract create(config: Config, key: string): Content;
  protected abstract readonly keyPrefix: string;

  protected createAndCache(
    config: BenchmarkCacheBaseConfig,
    key: string
  ): Content {
    const content = this.create(this.mapBaseConfigToCustomConfig(config), key);
    this.cache.set(key, content);
    return content;
  }

  protected dispose(key: string, content: Content): void {
    return;
  }

  protected cache = new LRUCache<string, Content>({
    length: (intersection) => intersection.size,
    dispose: (key, content) => this.dispose(key, content),
    noDisposeOnSet: true,
    max: cliArgs.limitMemory,
  });

  protected sortExperimentConfigItems(
    items: ExperimentConfigItem[]
  ): ExperimentConfigItem[] {
    return items.slice().sort((a, b) => a.experimentId - b.experimentId);
  }

  protected sortConfig({
    group1,
    group2,
    ...rest
  }: BenchmarkCacheBaseConfig): BenchmarkCacheBaseConfig {
    return {
      group1: this.sortExperimentConfigItems(group1),
      group2: this.sortExperimentConfigItems(group2),
      ...rest,
    };
  }
}
