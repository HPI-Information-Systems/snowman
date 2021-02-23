import {
  exampleDatasets,
  exampleExperiments,
} from '../../../../../../database/setup/examples';
import { Subclustering } from '../../cluster/subclustering';
import { clusteringFromPilotExperiment } from '../../cluster/test/clusteringFromFile';
import {
  calculateConfusionMatrixCounts,
  ConfusionMatrixCounts,
} from './counts';

describe('confusion matrix', function () {
  const expectedMatrix = {
    truePositives: 98,
    trueNegatives: 371839,
    falsePositives: 2,
    falseNegatives: 14,
  };
  let matrix: ConfusionMatrixCounts;
  beforeAll(async () => {
    const goldClustering = await clusteringFromPilotExperiment(
      exampleExperiments.restaurantGoldstandard1.file.path,
      exampleDatasets.restaurants.file.numberOfRecords
    );
    const experimentClustering = await clusteringFromPilotExperiment(
      exampleExperiments.restaurantExampleRun1.file.path,
      exampleDatasets.restaurants.file.numberOfRecords
    );

    const goldSubclustering = new Subclustering(
      goldClustering,
      experimentClustering
    );
    const experimentSubclustering = new Subclustering(
      experimentClustering,
      goldClustering
    );
    matrix = calculateConfusionMatrixCounts(
      goldSubclustering,
      experimentSubclustering
    );
  });

  test('calculates true positives correctly', () => {
    expect(matrix.truePositives).toBe(expectedMatrix.truePositives);
  });

  test('calculates true negatives correctly', () => {
    expect(matrix.trueNegatives).toBe(expectedMatrix.trueNegatives);
  });

  test('calculates false positives correctly', () => {
    expect(matrix.falsePositives).toBe(expectedMatrix.falsePositives);
  });

  test('calculates false negatives correctly', () => {
    expect(matrix.falseNegatives).toBe(expectedMatrix.falseNegatives);
  });
});
