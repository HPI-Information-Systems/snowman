import { setupDatabase } from '../../../../database';
import { DatasetId, ExperimentId } from '../../../../server/types';
import { numberOfPairs } from '../../../../tools/numberOfPairs';
import {
  IntersectionCache,
  IntersectionConfig,
} from '../../cache/flavors/intersectionCache';
import { expectClusteringsToEqual } from '../../cluster/test/utility';
import { ClusterID, NodeID } from '../../cluster/types';
import {
  confusionTuplesTestCases,
  loadTestCase,
  multiIntersectionTestCases,
} from './testCases';

function getClustering(args: IntersectionConfig) {
  return IntersectionCache.get(args)
    .rows()
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
  includedIds: ExperimentId[],
  excludedIds: ExperimentId[],
  expected: NodeID[][],
  datasetId: [DatasetId]
) {
  const included = includedIds.map((experimentId) => ({ experimentId }));
  const excluded = excludedIds.map((experimentId) => ({ experimentId }));
  expectClusteringsToEqual(
    getClustering({
      datasetId: datasetId[0],
      excluded,
      included,
    }),
    expected
  );
  expect(
    IntersectionCache.get({
      datasetId: datasetId[0],
      excluded,
      included,
    }).numberPairs
  ).toBe(expected.reduce((prev, cur) => prev + numberOfPairs(cur.length), 0));
  const result = [
    ...IntersectionCache.get({
      datasetId: datasetId[0],
      excluded,
      included,
    }).rows(0, 1),
    ...IntersectionCache.get({
      datasetId: datasetId[0],
      excluded,
      included,
    }).rows(1, 2),
    ...IntersectionCache.get({
      datasetId: datasetId[0],
      excluded,
      included,
    }).rows(3, 97),
    ...IntersectionCache.get({
      datasetId: datasetId[0],
      excluded,
      included,
    }).rows(100),
  ];
  const expectedClusters = IntersectionCache.get({
    datasetId: datasetId[0],
    excluded,
    included,
  }).rows();
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
    let datasetId: DatasetId;

    beforeAll(async () => {
      [[goldStandardId, experimentId], datasetId] = await loadTestCase([
        testCase.goldStandard,
        testCase.experiment,
      ]);
    });

    test('calculates true positives correctly', () => {
      testConfig([goldStandardId, experimentId], [], expectedTruePositives, [
        datasetId,
      ]);
      testConfig([goldStandardId, experimentId], [], expectedTruePositives, [
        datasetId,
      ]);
    });

    test('calculates false positives correctly', () => {
      testConfig([experimentId], [goldStandardId], expectedFalsePositives, [
        datasetId,
      ]);
      testConfig([experimentId], [goldStandardId], expectedFalsePositives, [
        datasetId,
      ]);
    });

    test('calculates false negatives correctly', () => {
      testConfig([goldStandardId], [experimentId], expectedFalseNegatives, [
        datasetId,
      ]);
      testConfig([goldStandardId], [experimentId], expectedFalseNegatives, [
        datasetId,
      ]);
    });
  }
);

describe.each(multiIntersectionTestCases)(
  'n experiment intersection',
  ({ negative, positive, pairs }) => {
    let experimentIds: ExperimentId[];
    let datasetId: DatasetId;
    beforeAll(async () => {
      [experimentIds, datasetId] = await loadTestCase([
        ...positive,
        ...negative,
      ]);
    });
    test('calculates test case correctly', () => {
      testConfig(
        experimentIds.slice(0, positive.length),
        experimentIds.slice(positive.length),
        pairs,
        [datasetId]
      );
    });
  }
);
