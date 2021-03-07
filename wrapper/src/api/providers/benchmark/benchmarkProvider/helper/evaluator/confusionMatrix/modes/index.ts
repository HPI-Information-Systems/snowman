import { NodeID, Subclustering } from '../../../cluster/types';
import { subclustersToPairs } from './pairs';

export function applySubclusteringTransformation(
  subclustering: Subclustering
): NodeID[][] {
  const result: NodeID[][] = [];
  for (const subclusters of subclustering.subclusters()) {
    const subclustersArray = [...subclusters];
    if (subclustersArray.length >= 2) {
      result.push(...subclustersToPairs(subclustersArray));
    }
  }
  return result;
}
