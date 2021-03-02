import { ExperimentIntersectionMode } from '../../../../../../../server/types';
import { NodeID, Subclustering } from '../../../cluster/types';
import { subclustersToClusters } from './clusters';
import { subclustersToInvestigative } from './investigative';
import { subclustersToPairs } from './pairs';
import { SubclusterTransformation } from './types';

const transformations = new Map<
  ExperimentIntersectionMode,
  SubclusterTransformation
>([
  [ExperimentIntersectionMode.Pairs, subclustersToPairs],
  [ExperimentIntersectionMode.Investigative, subclustersToInvestigative],
  [ExperimentIntersectionMode.Clusters, subclustersToClusters],
]);

export function applySubclusteringTransformation(
  subclustering: Subclustering,
  mode: ExperimentIntersectionMode
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
