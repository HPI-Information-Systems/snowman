import binarySearch from 'binary-search';

import { compareNumbers } from '../../../../tools/comparators';
import { NodeID } from '../helper/cluster/types';
import { IntersectionCounts } from './counts';

export class IntersectionClusters extends IntersectionCounts {
  clusters(startAt = 0, limit?: number): NodeID[][] {
    let startIndex = binarySearch(
      this.accumulatedRowCounts,
      startAt,
      compareNumbers
    );
    // TODO
    if (startIndex < 0) {
      startIndex = ~startIndex;
    } else {
    }
  }

  protected accumulatedRowCounts: number[] = [];
}
