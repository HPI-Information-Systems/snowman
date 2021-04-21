import { expectCorrectSubClusteringOrder } from '../test/clusteringOrder';
import { relaxedClusteringToClustering } from '../test/relaxedClusterings';
import { subclusteringTestCases } from '../test/testCases';
import {
  expectClusteringsToEqual,
  expectSubClusteringsToEqual,
} from '../test/utility';
import { Subclustering } from './subclustering';

describe.each(subclusteringTestCases)(
  'Subclustering',
  ({ base, partition, expectedClustering, expectedSubclustering }) => {
    let subclustering: Subclustering;
    beforeAll(() => {
      subclustering = new Subclustering(
        relaxedClusteringToClustering(base),
        relaxedClusteringToClustering(partition)
      );
    });

    test('calculates correct clusters', () => {
      expectClusteringsToEqual(subclustering, expectedClustering);
    });

    test('calculates correct subclusters', () => {
      expectSubClusteringsToEqual(subclustering, expectedSubclustering);
    });

    test('has correct order', () => {
      expectCorrectSubClusteringOrder(subclustering);
    });
  }
);
