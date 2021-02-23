import { compareArrays } from '../../../../../../tools/test/compareArrays';
import { NodeID } from '../types';
import {
  RelaxedClustering,
  relaxedClusteringToArray,
  RelaxedSubclustering,
  relaxedSubclusteringToArray,
} from './relaxedClusterings';

function prepareClusteringForMatching(
  clustering: RelaxedClustering
): NodeID[][] {
  clustering = relaxedClusteringToArray(clustering);
  return clustering.map((cluster) => cluster.sort()).sort(compareArrays);
}

function prepareSubclusteringForMatching(
  subclustering: RelaxedSubclustering
): NodeID[][][] {
  subclustering = relaxedSubclusteringToArray(subclustering);
  return subclustering
    .map((clustering) => prepareClusteringForMatching(clustering))
    .sort(compareArrays);
}

export function expectClusteringsToEqual(
  clustering: RelaxedClustering,
  expected: RelaxedClustering
): void {
  expect(prepareClusteringForMatching(clustering)).toEqual(
    prepareClusteringForMatching(expected)
  );
}

export function expectSubClusteringsToEqual(
  clustering: RelaxedSubclustering,
  expected: RelaxedSubclustering
): void {
  expect(prepareSubclusteringForMatching(clustering)).toEqual(
    prepareSubclusteringForMatching(expected)
  );
}
