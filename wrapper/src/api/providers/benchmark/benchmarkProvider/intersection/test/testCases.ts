import {
  AlgorithmId,
  DatasetId,
  ExperimentId,
} from '../../../../../server/types';
import { fileToReadable } from '../../../../../tools/test/filtToReadable';
import { getProviders } from '../../../..';
import {
  RelaxedClustering,
  relaxedClusteringToArray,
} from '../../helper/cluster/test/relaxedClusterings';
import { NodeID } from '../../helper/cluster/types';

type Clusters = number[][];

export const confusionTuplesTestCases: {
  goldStandard: RelaxedClustering;
  experiment: RelaxedClustering;
  expectedTruePositives: Clusters;
  expectedFalsePositives: Clusters;
  expectedFalseNegatives: Clusters;
}[] = [
  {
    goldStandard: [],
    experiment: [],
    expectedTruePositives: [],
    expectedFalseNegatives: [],
    expectedFalsePositives: [],
  },
  {
    goldStandard: [[0, 1, 2, 3, 4, 5]],
    experiment: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedTruePositives: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedFalseNegatives: [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
    ],
    expectedFalsePositives: [],
  },
  {
    goldStandard: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    experiment: [[0, 1, 2, 3, 4, 5]],
    expectedTruePositives: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedFalseNegatives: [],
    expectedFalsePositives: [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
    ],
  },
  {
    goldStandard: [
      [0, 1, 2],
      [3, 4, 5],
    ],
    experiment: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedTruePositives: [
      [0, 1],
      [4, 5],
    ],
    expectedFalseNegatives: [
      [0, 2],
      [1, 2],
      [3, 4],
      [3, 5],
    ],
    expectedFalsePositives: [[2, 3]],
  },
];

export async function loadExperiment(
  datasetId: DatasetId,
  algorithmId: AlgorithmId,
  experiment: NodeID[][]
): Promise<number> {
  const experimentId = getProviders().experiment.addExperiment({
    algorithmId,
    datasetId,
    name: '',
  });
  await getProviders().experiment.setExperimentFile(
    experimentId,
    'pilot',
    fileToReadable([
      ['p1', 'p2'],
      ...experiment.flatMap((cluster) => {
        const result = [];
        for (let index = 1; index < cluster.length; index++) {
          result.push([
            cluster[index].toString(),
            cluster[index - 1].toString(),
          ]);
        }
        return result;
      }),
    ])
  );
  return experimentId;
}

export async function loadTestCase({
  goldStandard,
  experiment,
}: typeof confusionTuplesTestCases[number]): Promise<{
  goldStandard: ExperimentId;
  experiment: ExperimentId;
}> {
  goldStandard = relaxedClusteringToArray(goldStandard);
  experiment = relaxedClusteringToArray(experiment);
  const numberOfRecords = goldStandard.reduce(
    (prev, cur) => prev + cur.length,
    0
  );
  const datasetId = getProviders().dataset.addDataset({
    name: '',
    numberOfRecords,
  });
  const algorithmId = getProviders().algorithm.addAlgorithm({
    name: '',
  });
  return {
    experiment: await loadExperiment(datasetId, algorithmId, experiment),
    goldStandard: await loadExperiment(datasetId, algorithmId, goldStandard),
  };
}
