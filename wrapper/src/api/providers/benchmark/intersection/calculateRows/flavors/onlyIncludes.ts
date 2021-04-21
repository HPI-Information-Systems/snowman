import { IntersectionCache } from '../../../cache/flavors/intersectionCache';
import { Cluster, NodeID } from '../../../cluster/types';
import { IntersectionOnlyIncludes } from '../../intersectionOnlyIncludes';
import { CalculateRowsFlavor } from './base';

export class CalculateRowsOnlyIncludes extends CalculateRowsFlavor {
  protected calculateRows(): ReturnType<CalculateRowsFlavor['calculateRows']> {
    const cluster = (IntersectionCache.get(
      this.config
    ) as IntersectionOnlyIncludes).clustering.clusterFromClusterId(
      this.clusterId
    );
    if (cluster.length > 1) {
      return this.calculateRowsNotEmpty(cluster);
    } else {
      return [0, []];
    }
  }

  protected calculateRowsNotEmpty(
    cluster: Cluster
  ): ReturnType<CalculateRowsFlavor['calculateRows']> {
    if (this.skip > cluster.length) {
      return [cluster.length + 1, []];
    } else if (this.skip === cluster.length) {
      return [this.skip, [undefined]];
    } else {
      return this.collectClusterIds(cluster);
    }
  }

  protected collectClusterIds(
    cluster: Cluster
  ): ReturnType<CalculateRowsFlavor['calculateRows']> {
    const rows: (NodeID | undefined)[] = [];
    let skipped = 0;
    for (const nodeId of cluster) {
      if (skipped < this.skip) {
        ++skipped;
      } else if (rows.length < this.limit) {
        rows.push(nodeId);
      } else {
        break;
      }
    }
    if (rows.length < this.limit) {
      rows.push(undefined);
    }
    return [skipped, rows];
  }
}
