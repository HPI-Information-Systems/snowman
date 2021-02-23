import { RelaxedClustering } from '../../../cluster/test/relaxedClusterings';
import { ConfusionTupleMode } from '../modes';

type Clusters = number[][];
type ClustersOfModes = { [key in ConfusionTupleMode]: Clusters };

export const confusionTuplesTestCases: {
  goldStandard: RelaxedClustering;
  experiment: RelaxedClustering;
  expectedTruePositives: Clusters;
  expectedFalsePositives: ClustersOfModes;
  expectedFalseNegatives: ClustersOfModes;
}[] = [
  {
    goldStandard: [],
    experiment: [],
    expectedTruePositives: [],
    expectedFalseNegatives: {
      [ConfusionTupleMode.PAIRS]: [],
      [ConfusionTupleMode.CLUSTERS]: [],
      [ConfusionTupleMode.INVESTIGATIVE]: [],
    },
    expectedFalsePositives: {
      [ConfusionTupleMode.PAIRS]: [],
      [ConfusionTupleMode.CLUSTERS]: [],
      [ConfusionTupleMode.INVESTIGATIVE]: [],
    },
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
    expectedFalseNegatives: {
      [ConfusionTupleMode.PAIRS]: [
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
      [ConfusionTupleMode.CLUSTERS]: [
        [0, 2, 4],
        [0, 2, 5],
        [0, 3, 4],
        [0, 3, 5],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
      ],
      [ConfusionTupleMode.INVESTIGATIVE]: [
        [0, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [2, 0, 1, 4, 5],
        [3, 0, 1, 4, 5],
        [4, 0, 1, 2, 3],
        [5, 0, 1, 2, 3],
      ],
    },
    expectedFalsePositives: {
      [ConfusionTupleMode.PAIRS]: [],
      [ConfusionTupleMode.CLUSTERS]: [],
      [ConfusionTupleMode.INVESTIGATIVE]: [],
    },
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
    expectedFalseNegatives: {
      [ConfusionTupleMode.PAIRS]: [],
      [ConfusionTupleMode.CLUSTERS]: [],
      [ConfusionTupleMode.INVESTIGATIVE]: [],
    },
    expectedFalsePositives: {
      [ConfusionTupleMode.PAIRS]: [
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
      [ConfusionTupleMode.CLUSTERS]: [
        [0, 2, 4],
        [0, 2, 5],
        [0, 3, 4],
        [0, 3, 5],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
      ],
      [ConfusionTupleMode.INVESTIGATIVE]: [
        [0, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [2, 0, 1, 4, 5],
        [3, 0, 1, 4, 5],
        [4, 0, 1, 2, 3],
        [5, 0, 1, 2, 3],
      ],
    },
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
    expectedFalseNegatives: {
      [ConfusionTupleMode.PAIRS]: [
        [0, 2],
        [1, 2],
        [3, 4],
        [3, 5],
      ],
      [ConfusionTupleMode.CLUSTERS]: [
        [0, 2],
        [1, 2],
        [3, 4],
        [3, 5],
      ],
      [ConfusionTupleMode.INVESTIGATIVE]: [
        [0, 2],
        [1, 2],
        [2, 0, 1],
        [3, 4, 5],
        [4, 3],
        [5, 3],
      ],
    },
    expectedFalsePositives: {
      [ConfusionTupleMode.PAIRS]: [[2, 3]],
      [ConfusionTupleMode.CLUSTERS]: [[2, 3]],
      [ConfusionTupleMode.INVESTIGATIVE]: [
        [2, 3],
        [3, 2],
      ],
    },
  },
];
