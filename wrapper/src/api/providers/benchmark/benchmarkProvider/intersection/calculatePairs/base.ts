import { ClusterID } from '../../cluster/types';
import type { Intersection } from '..';

export abstract class CalculatePairs {
  protected clusterId: ClusterID = 0;
  protected skip = 0;
  protected limit = 0;

  constructor(protected readonly intersection: Intersection) {}

  at(
    clusterId: ClusterID,
    skip: number,
    limit: number
  ): [number, (ClusterID | undefined)[]] {
    this.clusterId = clusterId;
    this.skip = skip;
    this.limit = limit;
    return this.calculatePairs();
  }

  protected abstract calculatePairs(): ReturnType<CalculatePairs['at']>;
}
