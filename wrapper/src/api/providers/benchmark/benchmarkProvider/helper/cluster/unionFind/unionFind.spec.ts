import { clusteringTestCases } from '../test/testCases';
import { expectClusteringsToEqual } from '../test/utility';
import { UnionFind } from './unionFind';

describe('UnionFind', function () {
  test.each(clusteringTestCases)(
    'calculates correct clusters',
    ({ numberNodes, linkedNodes, expectedClustering }) => {
      const clustering = new UnionFind(numberNodes);
      clustering.link(linkedNodes);
      expectClusteringsToEqual(clustering, expectedClustering);
    }
  );
});
