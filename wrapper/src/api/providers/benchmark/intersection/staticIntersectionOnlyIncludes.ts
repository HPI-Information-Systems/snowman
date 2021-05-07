import { tables } from '../../../database';
import { ExperimentConfigItem } from '../../../server/types';
import { LazyProperty } from '../../../tools/lazyProperty';
import { SubclusterCache } from '../cache';
import { Clustering } from '../cluster/types';
import { UnionFind } from '../cluster/unionFind';
import { IntersectionOnlyIncludes } from './intersectionOnlyIncludes';

export class StaticIntersectionOnlyIncludes extends IntersectionOnlyIncludes {
  protected _clustering = new LazyProperty(() => this.createClustering());
  get clustering(): Clustering {
    return this._clustering.value;
  }
  set clustering(clustering: Clustering) {
    this._clustering.value = clustering;
  }

  protected createClustering(): Clustering {
    if (this.config.included.length <= 1) {
      const clustering = new UnionFind(this.size);
      if (this.config.included.length === 0) {
        for (let index = 1; index < this.size; ++index) {
          clustering.link([[index, index - 1]]);
        }
      } else {
        clustering.link(this.experimentLinks(this.config.included[0]));
      }
      return clustering;
    } else {
      const splitIndex = Math.floor(this.config.included.length / 2);
      return SubclusterCache.get({
        datasetId: this.config.datasetId,
        base: this.config.included.slice(0, splitIndex),
        partition: this.config.included.slice(splitIndex),
        forceStatic: this.config.forceStatic,
      }).clustering;
    }
  }

  protected experimentLinks({
    experimentId,
    similarity,
  }: ExperimentConfigItem): [number, number][] {
    if (similarity) {
      const table = tables.experiment.similarityThresholdFunction(
        experimentId,
        similarity.func
      );
      return table.all(
        {},
        {
          returnedColumns: [
            table.schema.columns.id1.name,
            table.schema.columns.id2.name,
          ],
          raw: true,
          advancedFilters: [['similarity', '>=', similarity.threshold]],
        }
      ) as [number, number][];
    } else {
      const table = tables.experiment.experiment(experimentId);
      return table.all(
        { isDuplicateAndLinksUnlinkedNodes: 1 },
        {
          returnedColumns: [
            table.schema.columns.id1.name,
            table.schema.columns.id2.name,
          ],
          raw: true,
        }
      ) as [number, number][];
    }
  }
}
