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
} from '../../cluster/test/relaxedClusterings';
import { NodeID } from '../../cluster/types';

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

export const multiIntersectionTestCases: {
  positive: RelaxedClustering[];
  negative: RelaxedClustering[];
  pairs: NodeID[][];
}[] = [
  {
    positive: [[[0, 1, 2, 3, 4, 5]]],
    negative: [
      [
        [0, 1, 2],
        [3, 4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
    ],
    pairs: [
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
    ],
  },
  {
    positive: [
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
    ],
    negative: [
      [
        [0, 1, 2],
        [3, 4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
    ],
    pairs: [
      [0, 4],
      [1, 4],
      [2, 5],
    ],
  },
  {
    positive: [
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
      [
        [0, 1, 4],
        [2, 3, 5],
      ],
    ],
    negative: [
      [
        [0, 1, 2],
        [3, 4, 5],
      ],
      [
        [0, 1, 2],
        [3, 4, 5],
      ],
      [
        [0, 1, 2],
        [3, 4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
    ],
    pairs: [
      [0, 4],
      [1, 4],
      [2, 5],
    ],
  },
];

async function loadExperiment(
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

/**
 * @param experiments All clusterings must have the same number of ids x. Further they need to contain the ids 0 to x-1.
 * This ensures that the mapped id equals the given id.
 */
export async function loadTestCase(
  experiments: RelaxedClustering[]
): Promise<ExperimentId[]> {
  const experimentArrays = experiments.map(
    relaxedClusteringToArray
  ) as NodeID[][][];
  const numberOfRecords = experimentArrays[0].reduce(
    (prev, cur) => prev + cur.length,
    0
  );
  const datasetId = getProviders().dataset.addDataset({
    name: '',
  });
  await getProviders().dataset.setDatasetFile(
    datasetId,
    fileToReadable([
      ['id'],
      ...new Array(numberOfRecords)
        .fill(0)
        .map((_, index) => [index.toString()]),
    ]),
    'id',
    '"',
    "'",
    ','
  );
  const algorithmId = getProviders().algorithm.addAlgorithm({
    name: '',
  });
  return await Promise.all(
    experimentArrays.map((experimentArray) =>
      loadExperiment(datasetId, algorithmId, experimentArray)
    )
  );
}
