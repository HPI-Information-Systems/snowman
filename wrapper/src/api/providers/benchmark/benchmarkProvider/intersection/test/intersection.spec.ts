import { setupDatabase } from '../../../../../database';
import { ExperimentId } from '../../../../../server/types';
import { numberOfPairs } from '../../../../../tools/numberOfPairs';
import { expectClusteringsToEqual } from '../../cluster/test/utility';
import { ClusterID, NodeID } from '../../cluster/types';
import { Intersection } from '..';
import { IntersectionCache } from '../cache';
import {
  confusionTuplesTestCases,
  loadTestCase,
  multiIntersectionTestCases,
} from './testCases';

function getClustering(...args: ConstructorParameters<typeof Intersection>) {
  return IntersectionCache.get(...args)
    .clusters()
    .reduce<ClusterID[][]>(
      (cluster, id) => {
        if (id === undefined) {
          cluster.push([]);
        } else {
          cluster[cluster.length - 1].push(id);
        }
        return cluster;
      },
      [[]]
    )
    .slice(0, -1);
}

function testConfig(
  pos: ExperimentId[],
  neg: ExperimentId[],
  expected: NodeID[][]
) {
  expectClusteringsToEqual(getClustering(pos, neg), expected);
  expect(IntersectionCache.get(pos, neg).pairCount).toBe(
    expected.reduce((prev, cur) => prev + numberOfPairs(cur.length), 0)
  );
  const result = [
    ...IntersectionCache.get(pos, neg).clusters(0, 1),
    ...IntersectionCache.get(pos, neg).clusters(1, 2),
    ...IntersectionCache.get(pos, neg).clusters(3, 97),
    ...IntersectionCache.get(pos, neg).clusters(100),
  ];
  const expectedClusters = IntersectionCache.get(pos, neg).clusters();
  expect(result).toEqual(expectedClusters);
}
beforeAll(async () => {
  await setupDatabase({
    temporary: true,
    loadExampleEntries: false,
  });
});

describe.each(confusionTuplesTestCases)(
  '2 experiment intersection',
  function (testCase) {
    const {
      expectedTruePositives,
      expectedFalseNegatives,
      expectedFalsePositives,
    } = testCase;
    let goldStandardId: ExperimentId;
    let experimentId: ExperimentId;

    beforeAll(async () => {
      [goldStandardId, experimentId] = await loadTestCase([
        testCase.goldStandard,
        testCase.experiment,
      ]);
    });

    test('calculates true positives correctly', () => {
      testConfig([goldStandardId, experimentId], [], expectedTruePositives);
      testConfig([goldStandardId, experimentId], [], expectedTruePositives);
    });

    test('calculates false positives correctly', () => {
      testConfig([experimentId], [goldStandardId], expectedFalsePositives);
      testConfig([experimentId], [goldStandardId], expectedFalsePositives);
    });

    test('calculates false negatives correctly', () => {
      testConfig([goldStandardId], [experimentId], expectedFalseNegatives);
      testConfig([goldStandardId], [experimentId], expectedFalseNegatives);
    });
  }
);

describe.each(multiIntersectionTestCases)(
  'n experiment intersection',
  ({ negative, positive, pairs }) => {
    let experimentIds: ExperimentId[];
    beforeAll(async () => {
      experimentIds = await loadTestCase([...positive, ...negative]);
    });
    test('calculates test case correctly', () => {
      testConfig(
        experimentIds.slice(0, positive.length),
        experimentIds.slice(positive.length),
        pairs
      );
    });
  }
);
