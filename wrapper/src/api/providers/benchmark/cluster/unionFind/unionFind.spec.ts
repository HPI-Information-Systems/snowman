import { clusteringTestCases } from '../test/testCases';
import { expectClusteringsToEqual } from '../test/utility';
import { MergesT } from '../types';
import { UnionFind } from './unionFind';

function prepareMergesForMatching(merges: MergesT) {
  return {
    clusterIDSwaps: merges.clusterIDSwaps.map((ids) => ids.sort()),
    merges: merges.merges
      .map(({ group, target }) => ({
        group: group.sort(),
        target,
      }))
      .sort(({ target: t1 }, { target: t2 }) => t1 - t2),
  };
}

describe.each(clusteringTestCases)(
  'UnionFind',
  function ({ trackedSteps, expectedClustering, linkedNodes, numberNodes }) {
    test('calculates correct clusters', () => {
      const clustering = new UnionFind(numberNodes);
      clustering.link(linkedNodes);
      expectClusteringsToEqual(clustering, expectedClustering);
    });
    test('tracks correct links', () => {
      const clustering = new UnionFind(numberNodes);
      let from = 0;
      for (const { merges, linkNext } of trackedSteps) {
        const to = from + linkNext;
        const receivedMerges = clustering.trackedLink(
          linkedNodes.slice(from, to)
        );
        const expected = prepareMergesForMatching(merges);
        const received = prepareMergesForMatching(receivedMerges);
        expect(received).toEqual(expected);
        from = to;
      }
    });
  }
);
