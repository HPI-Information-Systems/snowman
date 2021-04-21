import { IntersectionConfig } from '../../../cache/flavors/intersectionCache';
import { ClusterID } from '../../../cluster/types';

export abstract class CalculateRowsFlavor {
  protected clusterId: ClusterID = 0;
  protected skip = 0;
  protected limit = 0;

  constructor(protected readonly config: IntersectionConfig) {}

  at(
    clusterId: ClusterID,
    skip: number,
    limit: number
  ): [number, (ClusterID | undefined)[]] {
    this.clusterId = clusterId;
    this.skip = skip;
    this.limit = limit;
    return this.calculateRows();
  }

  protected abstract calculateRows(): ReturnType<CalculateRowsFlavor['at']>;
}
