import { List } from '../../../../../../../tools/list';
import { Cluster, NodeID } from '../../../cluster/types';

export function subclustersToInvestigative(
  subclusters: Cluster[]
): List<NodeID[]> {
  const investigateClusters = new List<NodeID[]>();
  for (const mainSubcluster of subclusters) {
    for (const mainId of mainSubcluster) {
      const mainCluster = [mainId];
      for (const otherSubcluster of subclusters) {
        if (otherSubcluster !== mainSubcluster) {
          for (const otherId of otherSubcluster) {
            mainCluster.push(otherId);
          }
        }
      }
      investigateClusters.insertFront(mainCluster);
    }
  }
  return investigateClusters;
}
