import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { StoredDataset } from '../../dataset/util/converter';
import { BenchmarkCacheContent } from '../cache';
import { IntersectionConfig } from '../cache/flavors/intersectionCache';
import { NodeID } from '../cluster/types';
import { CalculateRows } from './calculateRows';

export abstract class IntersectionBase
  implements BenchmarkCacheContent<IntersectionConfig> {
  readonly dataset: StoredDataset & { numberOfRecords: number };
  abstract readonly numberPairs: number;
  abstract readonly numberRows: number;

  get size(): number {
    return this.dataset.numberOfRecords;
  }

  constructor(public config: IntersectionConfig) {
    this.dataset = tables.meta.dataset.get({
      id: config.datasetId,
    }) as this['dataset'];
  }

  rows(startAt?: number, limit?: number): (NodeID | undefined)[] {
    return this.calculateRows.value.rows(startAt, limit);
  }

  access(config: IntersectionConfig): void {
    this.config = config;
  }

  protected readonly calculateRows = new LazyProperty(
    () => new CalculateRows(this.config)
  );
}
