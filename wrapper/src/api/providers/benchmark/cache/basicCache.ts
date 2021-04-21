import LRUCache from 'lru-cache';

import {
  DatasetId,
  ExperimentConfigItem,
  ExperimentId,
  SimilarityThresholdFunctionId,
} from '../../../server/types';
import { cliArgs } from '../../../tools/cli';
import { BenchmarkCacheBaseConfig, BenchmarkCacheContent } from './types';

export abstract class BasicBenchmarkCache<
  Config,
  Content extends BenchmarkCacheContent<Config>
> {
  get(config: Config): Content {
    const baseConfig = this.sortConfig(
      this.mapCustomConfigToBaseConfig(config)
    );
    const key = this.keyOfBaseConfig(baseConfig, this.keyPrefix);
    let intersection = this.cache.get(key);
    if (!intersection) {
      intersection = this.createAndCache(baseConfig, key);
    } else {
      intersection.access(config);
    }
    return intersection;
  }

  keyOf(config: Config): string {
    const baseConfig = this.mapCustomConfigToBaseConfig(config);
    return this.keyOfBaseConfig(baseConfig, this.keyPrefix);
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
    return items
      .slice()
      .sort((a, b) =>
        a.similarity && !b.similarity
          ? -1
          : b.similarity && !a.similarity
          ? 1
          : a.experimentId - b.experimentId
      );
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

  protected stringifyExperiment(experiment: ExperimentId): string {
    return `e${experiment}E`;
  }

  protected stringifySimilarityFunction(
    func: SimilarityThresholdFunctionId
  ): string {
    return `s${func}S`;
  }

  protected stringifyDataset(dataset: DatasetId): string {
    return `d${dataset}D`;
  }

  protected stringifyExperimentConfigItem(
    { experimentId, similarity }: ExperimentConfigItem,
    config: BenchmarkCacheBaseConfig
  ): string {
    return `${this.stringifyExperiment(experimentId)}${
      similarity
        ? `:${this.stringifySimilarityFunction(similarity.func)}=${
            similarity.threshold
          }`
        : ''
    }`;
  }

  protected stringifyExperimentConfigItems(
    items: ExperimentConfigItem[],
    config: BenchmarkCacheBaseConfig
  ): string {
    return items
      .map((item) => this.stringifyExperimentConfigItem(item, config))
      .join('&');
  }

  protected keyOfBaseConfig(
    config: BenchmarkCacheBaseConfig,
    keyPrefix: string
  ): string {
    return `${keyPrefix}-${this.stringifyDataset(
      config.datasetId
    )}-${this.stringifyExperimentConfigItems(
      config.group1,
      config
    )}-${this.stringifyExperimentConfigItems(config.group2, config)}`;
  }
}
