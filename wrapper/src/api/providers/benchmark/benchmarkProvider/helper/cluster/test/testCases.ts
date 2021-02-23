import { NodeID } from '../types';
import { RelaxedClustering, RelaxedSubclustering } from './relaxedClusterings';

export const clusteringTestCases: {
  readonly numberNodes: number;
  readonly linkedNodes: [NodeID, NodeID][];
  readonly expectedClustering: RelaxedClustering;
}[] = [
  {
    numberNodes: 0,
    linkedNodes: [],
    expectedClustering: [],
  },
  {
    numberNodes: 4,
    linkedNodes: [],
    expectedClustering: [[0], [1], [2], [3]],
  },
  {
    numberNodes: 4,
    linkedNodes: [
      [0, 1],
      [2, 3],
    ],
    expectedClustering: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    numberNodes: 6,
    linkedNodes: [
      [0, 3],
      [0, 4],
      [4, 1],
    ],
    expectedClustering: [[0, 1, 3, 4], [2], [5]],
  },
  {
    numberNodes: 2,
    linkedNodes: [
      [0, 0],
      [1, 1],
    ],
    expectedClustering: [[0], [1]],
  },
  {
    numberNodes: 10,
    linkedNodes: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
    ],
    expectedClustering: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  },
  {
    numberNodes: 10,
    linkedNodes: [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
    expectedClustering: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  },
  {
    numberNodes: 10,
    linkedNodes: [
      [1, 0],
      [3, 2],
      [5, 4],
      [7, 6],
      [9, 8],
      [2, 1],
      [4, 3],
      [8, 7],
      [7, 9],
      [0, 5],
      [5, 0],
    ],
    expectedClustering: [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9],
    ],
  },
];

export const subclusteringTestCases: {
  base: RelaxedClustering;
  partition: RelaxedClustering;
  expectedClustering: RelaxedClustering;
  expectedSubclustering: RelaxedSubclustering;
}[] = [
  {
    base: [],
    partition: [],
    expectedClustering: [],
    expectedSubclustering: [],
  },
  {
    base: [[0, 1, 2, 3, 4, 5]],
    partition: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedClustering: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedSubclustering: [
      [
        [0, 1],
        [2, 3],
        [4, 5],
      ],
    ],
  },
  {
    base: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    partition: [[0, 1, 2, 3, 4, 5]],
    expectedClustering: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedSubclustering: [[[0, 1]], [[2, 3]], [[4, 5]]],
  },
  {
    base: [
      [0, 1, 2],
      [3, 4, 5],
    ],
    partition: [
      [0, 1],
      [2, 3],
      [4, 5],
    ],
    expectedClustering: [[0, 1], [2], [3], [4, 5]],
    expectedSubclustering: [
      [[0, 1], [2]],
      [[3], [4, 5]],
    ],
  },
  {
    base: [
      [0, 1, 2],
      [3, 4, 5],
    ],
    partition: [[0, 1, 2], [3], [4, 5]],
    expectedClustering: [[0, 1, 2], [3], [4, 5]],
    expectedSubclustering: [[[0, 1, 2]], [[3], [4, 5]]],
  },
  {
    base: [[0], [1], [2]],
    partition: [[0], [1], [2]],
    expectedClustering: [[0], [1], [2]],
    expectedSubclustering: [[[0]], [[1]], [[2]]],
  },
];
