import { NodeID, Subclustering } from '../../../cluster/types';
import { subclustersToClusters } from './clusters';
import { subclustersToInvestigative } from './investigative';
import { ConfusionTupleMode } from './modes';
import { subclustersToPairs } from './pairs';
import { SubclusterTransformation } from './types';

export * from './modes';

const transformations = new Map<ConfusionTupleMode, SubclusterTransformation>([
  [ConfusionTupleMode.PAIRS, subclustersToPairs],
  [ConfusionTupleMode.INVESTIGATIVE, subclustersToInvestigative],
  [ConfusionTupleMode.CLUSTERS, subclustersToClusters],
]);

export function applySubclusteringTransformation(
  subclustering: Subclustering,
  mode: ConfusionTupleMode
): NodeID[][] {
  const transformation = transformations.get(mode);
  if (!transformation) {
    throw new Error(`Unknown subclustering transformation: ${mode}`);
  }
  const result: NodeID[][] = [];
  for (const subclusters of subclustering.subclusters()) {
    const subclustersArray = [...subclusters];
    if (subclustersArray.length >= 2) {
      result.push(...transformation(subclustersArray));
    }
  }
  return result;
}
