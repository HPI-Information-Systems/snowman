import { LazyProperty } from '../../../tools/lazyProperty';
import { IntersectionCache } from '../cache/flavors/intersectionCache';
import { ModularSubclustering } from '../cluster/modularSubclustering';
import { Subclustering } from '../cluster/subclustering';
import { MergesT } from '../cluster/types';
import { IntersectionOnlyIncludes } from '../intersection/intersectionOnlyIncludes';
import { ModularIntersectionOneInclude } from '../intersection/modularIntersectionOneInclude';
import { CacheableSubclustingBase } from './cacheableSubclusteringBase';

export class CacheableModularSubclusting extends CacheableSubclustingBase {
  protected get fixedPartition(): IntersectionOnlyIncludes {
    return IntersectionCache.get({
      datasetId: this.config.datasetId,
      included: this.config.partition,
      excluded: [],
      forceStatic: this.config.forceStatic,
    }) as IntersectionOnlyIncludes;
  }
  protected modularBase = new LazyProperty(
    () =>
      IntersectionCache.get({
        datasetId: this.config.datasetId,
        included: this.config.base,
        excluded: [],
        forceStatic: this.config.forceStatic,
      }) as ModularIntersectionOneInclude
  );

  protected changes: MergesT[] = [];

  protected readonly _clustering = new LazyProperty(() => {
    const fixedPartition = this.fixedPartition.clustering;
    const modularBase = this.modularBase.value;
    const modularSubclustering = new ModularSubclustering(
      fixedPartition,
      new Subclustering(modularBase.clustering, fixedPartition)
    );
    const changesSubscription = modularBase.changesSubject.subscribe(
      (changes) => {
        this.changes.push(changes);
      }
    );
    const resetSubscription = modularBase.resetSubject.subscribe(() => {
      resetSubscription.unsubscribe();
      changesSubscription.unsubscribe();
      this._clustering.clear();
      this.modularBase.clear();
      this.changes = [];
    });
    return modularSubclustering;
  });

  get clustering(): ModularSubclustering {
    this.update();
    return this._clustering.value;
  }

  update(): void {
    this.modularBase.value.access({
      datasetId: this.config.datasetId,
      included: this.config.base,
      excluded: [],
      forceStatic: this.config.forceStatic,
    });
    this.modularBase.value.update();
    for (const merges of this.changes) {
      this._clustering.value.update(merges);
    }
    this.changes = [];
  }
}
