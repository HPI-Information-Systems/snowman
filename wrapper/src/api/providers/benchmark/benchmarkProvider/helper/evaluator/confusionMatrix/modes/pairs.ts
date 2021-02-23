import { List } from '../../../../../../../tools/list';
import { Cluster, NodeID } from '../../../cluster/types';

export function subclustersToPairs(subclusters: Cluster[]): List<NodeID[]> {
  const pairs = new List<NodeID[]>();
  for (let lower = 0; lower < subclusters.length; lower++) {
    const lowerSubcluster = subclusters[lower];
    for (const lowerId of lowerSubcluster) {
      for (let upper = lower + 1; upper < subclusters.length; upper++) {
        const upperSubcluster = subclusters[upper];
        for (const upperId of upperSubcluster) {
          pairs.insertFront([lowerId, upperId]);
        }
      }
    }
  }
  return pairs;
}
