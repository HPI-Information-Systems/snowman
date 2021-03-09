import { setupDatabase } from '../../../../../database';
import { ExperimentId } from '../../../../../server/types';
import { expectClusteringsToEqual } from '../../cluster/test/utility';
import { ClusterID } from '../../cluster/types';
import { Intersection } from '..';
import { IntersectionCache } from '../cache';
import { confusionTuplesTestCases, loadTestCase } from './testCases';

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

describe.each(confusionTuplesTestCases)(
  'confusion tuples',
  function (testCase) {
    const {
      expectedTruePositives,
      expectedFalseNegatives,
      expectedFalsePositives,
    } = testCase;
    let goldStandardId: ExperimentId;
    let experimentId: ExperimentId;

    beforeEach(async () => {
      await setupDatabase({
        temporary: true,
        loadExampleEntries: false,
      });
      const experimentIds = await loadTestCase(testCase);
      goldStandardId = experimentIds.goldStandard;
      experimentId = experimentIds.experiment;
    });

    test('calculates true positives correctly', () => {
      expectClusteringsToEqual(
        getClustering([goldStandardId, experimentId], []),
        expectedTruePositives
      );
    });

    test('calculates false positives correctly', () => {
      expectClusteringsToEqual(
        getClustering([experimentId], [goldStandardId]),
        expectedFalsePositives
      );
    });

    test('calculates false negatives correctly', () => {
      expectClusteringsToEqual(
        getClustering([goldStandardId], [experimentId]),
        expectedFalseNegatives
      );
    });
  }
);
