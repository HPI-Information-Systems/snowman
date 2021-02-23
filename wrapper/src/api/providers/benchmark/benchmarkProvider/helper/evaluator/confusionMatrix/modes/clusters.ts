import { List } from '../../../../../../../tools/list';
import { Cluster, NodeID } from '../../../cluster/types';

export function subclustersToClusters(subclusters: Cluster[]): List<NodeID[]> {
  const clusters = new List<NodeID[]>();
  const subclusterArrays = subclusters.map((subcluster) => [...subcluster]);
  const dimensionIndices = subclusters.map(() => 0);

  function increaseDimensionIndices() {
    let index = dimensionIndices.length - 1;
    while (index >= 0) {
      dimensionIndices[index] =
        (dimensionIndices[index] + 1) % subclusters[index].length;
      if (dimensionIndices[index] === 0) {
        index -= 1;
      } else {
        return true;
      }
    }
    return false;
  }

  do {
    clusters.insertFront(
      dimensionIndices.map(
        (index, dimension) => subclusterArrays[dimension][index]
      )
    );
  } while (increaseDimensionIndices());

  return clusters;
}
