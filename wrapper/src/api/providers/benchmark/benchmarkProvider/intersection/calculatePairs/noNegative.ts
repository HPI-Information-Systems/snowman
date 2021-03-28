import { Cluster, NodeID } from '../../cluster/types';
import { CalculatePairs } from './base';

export class CalculatePairsNoNegative extends CalculatePairs {
  protected calculatePairs(): ReturnType<CalculatePairs['calculatePairs']> {
    const cluster = this.intersection.clustering.clusterFromClusterId(
      this.clusterId
    );
    if (cluster.length > 1) {
      return this.calculatePairsNotEmpty(cluster);
    } else {
      return [0, []];
    }
  }

  protected calculatePairsNotEmpty(
    cluster: Cluster
  ): ReturnType<CalculatePairs['calculatePairs']> {
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
  ): ReturnType<CalculatePairs['calculatePairs']> {
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
