import { Subject } from 'rxjs';

import { tables } from '../../../database';
import { LazyProperty } from '../../../tools/lazyProperty';
import { IntersectionConfig } from '../cache/flavors/intersectionCache';
import { MergesT, NodeLink } from '../cluster/types';
import { TrackableUnionFind } from '../cluster/unionFind/trackableUnionFind';
import { IntersectionOnlyIncludes } from './intersectionOnlyIncludes';

export class ModularIntersectionOnlyIncludes extends IntersectionOnlyIncludes {
  protected readonly _clustering = new LazyProperty(
    () => new TrackableUnionFind(this.size)
  );
  get clustering(): TrackableUnionFind {
    this.update();
    return this._clustering.value;
  }

  protected lastAccessedThreshold = Number.POSITIVE_INFINITY;

  readonly resetSubject = new Subject<void>();
  readonly changesSubject = new Subject<MergesT>();

  update(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const threshold = this.config.included[0].similarity!.threshold;
    if (threshold > this.lastAccessedThreshold) {
      this.reset();
    }
    if (threshold < this.lastAccessedThreshold) {
      this.applyLinks(this.getLinks(this.lastAccessedThreshold, threshold));
    }
  }

  access(config: IntersectionConfig): void {
    if (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.included[0].similarity!.threshold !==
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.config.included[0].similarity!.threshold
    ) {
      this.calculateRows.clear();
    }
    super.access(config);
  }

  protected applyLinks(links: NodeLink[]): void {
    this.changesSubject.next(this._clustering.value.trackedLink(links));
  }

  protected getLinks(
    upperThreshold: number,
    lowerThreshold: number
  ): NodeLink[] {
    const { experimentId, similarity } = this.config.included[0];
    const table = tables.experiment.similarityThresholdFunction(
      experimentId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      similarity!.func
    );
    return table.all(
      {},
      {
        returnedColumns: [
          table.schema.columns.id1.name,
          table.schema.columns.id2.name,
        ],
        raw: true,
        advancedFilters: [
          ['similarity', '>=', lowerThreshold],
          ['similarity', '<', upperThreshold],
        ],
      }
    ) as [number, number][];
  }

  protected reset(): void {
    this.resetSubject.next();
    this._clustering.clear();
    this.lastAccessedThreshold = Number.POSITIVE_INFINITY;
  }
}
