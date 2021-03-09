import { Cluster } from '../../helper/cluster/types';
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
    } else if (this.skip === 0 && this.limit >= cluster.length) {
      return this.collectAllClusterIds(cluster);
    } else {
      return [
        this.skip,
        [...cluster, undefined].slice(this.skip, this.skip + this.limit),
      ];
    }
  }

  protected collectAllClusterIds(
    cluster: Cluster
  ): ReturnType<CalculatePairs['calculatePairs']> {
    if (this.limit === cluster.length) {
      return [0, [...cluster]];
    } else {
      return [0, [...cluster, undefined]];
    }
  }
}
