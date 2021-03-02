import { ExperimentIntersectionMode } from '../../../../../../../server/types';
import { RelaxedClustering } from '../../../cluster/test/relaxedClusterings';

type Clusters = number[][];
type ClustersOfModes = { [key in ExperimentIntersectionMode]: Clusters };

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
      [ExperimentIntersectionMode.Pairs]: [],
      [ExperimentIntersectionMode.Clusters]: [],
      [ExperimentIntersectionMode.Investigative]: [],
    },
    expectedFalsePositives: {
      [ExperimentIntersectionMode.Pairs]: [],
      [ExperimentIntersectionMode.Clusters]: [],
      [ExperimentIntersectionMode.Investigative]: [],
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
      [ExperimentIntersectionMode.Pairs]: [
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
      [ExperimentIntersectionMode.Clusters]: [
        [0, 2, 4],
        [0, 2, 5],
        [0, 3, 4],
        [0, 3, 5],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
      ],
      [ExperimentIntersectionMode.Investigative]: [
        [0, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
        [2, 0, 1, 4, 5],
        [3, 0, 1, 4, 5],
        [4, 0, 1, 2, 3],
        [5, 0, 1, 2, 3],
      ],
    },
    expectedFalsePositives: {
      [ExperimentIntersectionMode.Pairs]: [],
      [ExperimentIntersectionMode.Clusters]: [],
      [ExperimentIntersectionMode.Investigative]: [],
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
      [ExperimentIntersectionMode.Pairs]: [],
      [ExperimentIntersectionMode.Clusters]: [],
      [ExperimentIntersectionMode.Investigative]: [],
    },
    expectedFalsePositives: {
      [ExperimentIntersectionMode.Pairs]: [
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
      [ExperimentIntersectionMode.Clusters]: [
        [0, 2, 4],
        [0, 2, 5],
        [0, 3, 4],
        [0, 3, 5],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
      ],
      [ExperimentIntersectionMode.Investigative]: [
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
      [ExperimentIntersectionMode.Pairs]: [
        [0, 2],
        [1, 2],
        [3, 4],
        [3, 5],
      ],
      [ExperimentIntersectionMode.Clusters]: [
        [0, 2],
        [1, 2],
        [3, 4],
        [3, 5],
      ],
      [ExperimentIntersectionMode.Investigative]: [
        [0, 2],
        [1, 2],
        [2, 0, 1],
        [3, 4, 5],
        [4, 3],
        [5, 3],
      ],
    },
    expectedFalsePositives: {
      [ExperimentIntersectionMode.Pairs]: [[2, 3]],
      [ExperimentIntersectionMode.Clusters]: [[2, 3]],
      [ExperimentIntersectionMode.Investigative]: [
        [2, 3],
        [3, 2],
      ],
    },
  },
];
