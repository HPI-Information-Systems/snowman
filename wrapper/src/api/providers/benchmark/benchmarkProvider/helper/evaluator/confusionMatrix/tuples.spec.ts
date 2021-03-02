import { ExperimentIntersectionMode } from '../../../../../../server/types';
import { Subclustering } from '../../cluster/subclustering';
import { relaxedClusteringToClustering } from '../../cluster/test/relaxedClusterings';
import { expectClusteringsToEqual } from '../../cluster/test/utility';
import { confusionTuplesTestCases } from './test/testCases';
import {
  calculateConfusionMatrixTuples,
  ConfusionMatrixTuples,
} from './tuples';

describe.each(confusionTuplesTestCases)(
  'confusion tuples',
  function ({
    goldStandard,
    experiment,
    expectedTruePositives,
    expectedFalseNegatives,
    expectedFalsePositives,
  }) {
    let goldSubclustering: Subclustering;
    let experimentSubclustering: Subclustering;
    beforeAll(() => {
      const goldClustering = relaxedClusteringToClustering(goldStandard);
      const experimentClustering = relaxedClusteringToClustering(experiment);
      goldSubclustering = new Subclustering(
        goldClustering,
        experimentClustering
      );
      experimentSubclustering = new Subclustering(
        experimentClustering,
        goldClustering
      );
    });
    describe.each(
      Object.values(ExperimentIntersectionMode).filter(
        (mode) => typeof mode === 'string'
      ) as ExperimentIntersectionMode[]
    )('mode', (mode) => {
      let confusionMatrixTuples: ConfusionMatrixTuples;
      beforeAll(() => {
        confusionMatrixTuples = calculateConfusionMatrixTuples(
          goldSubclustering,
          experimentSubclustering,
          mode
        );
      });

      test('calculates true positives correctly', () => {
        expectClusteringsToEqual(
          confusionMatrixTuples.truePositives,
          expectedTruePositives
        );
      });

      test('calculates false positives correctly', () => {
        expectClusteringsToEqual(
          confusionMatrixTuples.falsePositives,
          expectedFalsePositives[mode]
        );
      });

      test('calculates false negatives correctly', () => {
        expectClusteringsToEqual(
          confusionMatrixTuples.falseNegatives,
          expectedFalseNegatives[mode]
        );
      });
    });
  }
);
