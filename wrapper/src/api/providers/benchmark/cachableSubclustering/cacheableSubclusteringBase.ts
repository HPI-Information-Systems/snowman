import { tables } from '../../../database';
import { StoredDataset } from '../../dataset/util/converter';
import { BenchmarkCacheContent } from '../cache';
import { SubclusteringConfig } from '../cache';
import { Subclustering } from '../cluster/types';

export abstract class CacheableSubclustingBase
  implements BenchmarkCacheContent<SubclusteringConfig> {
  readonly dataset: StoredDataset & { numberOfRecords: number };

  get size(): number {
    return this.dataset.numberOfRecords;
  }

  abstract readonly clustering: Subclustering;

  constructor(public config: SubclusteringConfig, readonly key: string) {
    this.dataset = tables.meta.dataset.get({
      id: config.datasetId,
    }) as this['dataset'];
  }

  access(config: SubclusteringConfig): void {
    this.config = config;
  }
}
