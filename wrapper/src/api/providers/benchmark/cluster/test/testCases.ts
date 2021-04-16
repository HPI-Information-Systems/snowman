import { MergesT, NodeID } from '../types';
import { RelaxedClustering, RelaxedSubclustering } from './relaxedClusterings';

export const clusteringTestCases: {
  readonly numberNodes: number;
  readonly linkedNodes: [NodeID, NodeID][];
  readonly expectedClustering: RelaxedClustering;
  readonly trackedSteps: {
    linkNext: number;
    merges: MergesT;
  }[];
}[] = [
  {
    numberNodes: 0,
    linkedNodes: [],
    expectedClustering: [],
    trackedSteps: [],
  },
  {
    numberNodes: 4,
    linkedNodes: [],
    expectedClustering: [[0], [1], [2], [3]],
    trackedSteps: [
      {
        linkNext: 0,
        merges: {
          clusterIDSwaps: [],
          merges: [],
        },
      },
    ],
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
    trackedSteps: [
      // 0:0 - 1:1 - 2:2 - 3:3
      {
        linkNext: 1,
        merges: {
          merges: [
            {
              group: [0, 1],
              target: 1,
            },
          ],
          clusterIDSwaps: [[0, 3]],
        },
      },
      // 0:3 - 1:0,1 - 2:2
      {
        linkNext: 1,
        merges: {
          merges: [
            {
              group: [0, 2],
              target: 0,
            },
          ],
          clusterIDSwaps: [],
        },
      },
      // 0:2,3 - 1:0,1
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
    trackedSteps: [
      // 0:0 - 1:1 - 2:2 - 3:3 - 4:4 - 5:5
      // 0:5 - 1:1 - 2:2 - 3:0,3 - 4:4
      // 0:5 - 1:1 - 2:2 - 3:0,3,4
      {
        linkNext: 3,
        merges: {
          merges: [
            {
              group: [0, 1, 3, 4],
              target: 1,
            },
          ],
          clusterIDSwaps: [
            [0, 5],
            [1, 3],
          ],
        },
      },
      // 0:5 - 1:0,1,3,4 - 2:2
    ],
  },
  {
    numberNodes: 2,
    linkedNodes: [
      [0, 0],
      [1, 1],
    ],
    expectedClustering: [[0], [1]],
    trackedSteps: [
      {
        linkNext: 2,
        merges: {
          clusterIDSwaps: [],
          merges: [],
        },
      },
    ],
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
    trackedSteps: [
      // 0:1 - 1:1 - 2:2 - 3:3 - ... - 9:9
      // 0:9 - 1:0,1 - 2:2 - ... - 8:8
      // 0:9 - 1:0,1,2 - 8:8 - 3:3 - ... - 7:7
      // 0:9 - 1:0,1,2,3 - 8:8 - 7:7 - 4:4 - ... - 6:6
      // ...
      // 0:1,...,9
      {
        linkNext: 9,
        merges: {
          merges: [
            {
              group: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
              target: 0,
            },
          ],
          clusterIDSwaps: [
            [0, 9],
            [2, 8],
            [3, 7],
            [4, 6],
            [0, 1],
          ],
        },
      },
    ],
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
    trackedSteps: [
      // 0:1 - 1:1 - 2:2 - 3:3 - ... - 9:9
      // 0:9 - 1:0,1 - 2:2 - ... - 8:8
      // 0:9 - 1:0,1 - 2:8 - 3:2,3 - 4:4 - ... - 7:7
      // 0:9 - 1:0,1 - 2:8 - 3:2,3 - 4:7 - 5:4,5 - 6:6
      // 0:9 - 1:0,1 - 2:8 - 3:2,3 - 4:6,7 - 5:4,5
      // 0:8,9 - 1:0,1 - 2:4,5 - 3:2,3 - 4:6,7
      {
        linkNext: 6,
        merges: {
          merges: [
            {
              group: [8, 9],
              target: 0,
            },
            {
              group: [6, 7],
              target: 1,
            },
            {
              group: [4, 5],
              target: 2,
            },
            {
              group: [0, 1, 2, 3],
              target: 3,
            },
          ],
          clusterIDSwaps: [
            [0, 9],
            [2, 8],
            [4, 7],
            [2, 5],
            [1, 4],
          ],
        },
      },
      // 0:8,9 - 1:6,7 - 2:4,5 - 3:0,1,2,3
      // 0:8,9 - 1:6,7 - 2:0,1,2,3,4,5
      // 0:8,9 - 1:0,1,...,7
      {
        linkNext: 3,
        merges: {
          merges: [
            {
              group: [0, 1, 2, 3],
              target: 0,
            },
          ],
          clusterIDSwaps: [
            [2, 3],
            [1, 2],
            [0, 1],
          ],
        },
      },
      // 0:1,...,9
    ],
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
    trackedSteps: [
      // 0:0 - ... - 9:9
      // 0:0,1 - 1:9 - ... - 8:8
      // 0:0,1 - 1:9 - 2:2,3 - 3:8 - 4:4 - 5:5 - 6:6 - 7:7
      // 0:0,1 - 1:9 - 2:2,3 - 3:8 - 4:4,5 - 5:7 - 6:6
      // 0:0,1 - 1:9 - 2:2,3 - 3:8 - 4:4,5 - 5:6,7
      // 0:0,1 - 1:6,7 - 2:2,3 - 3:8,9 - 4:4,5
      // 0:0,1,2,3 - 1:6,7 - 2: 4,5 - 3:8,9
      // 0:0,1,2,3,4,5 - 1:6,7 - 2:8,9
      // 0:0,1,2,3,4,5 - 1:6,7,8,9
      {
        linkNext: 11,
        merges: {
          merges: [
            { group: [0, 1, 2, 3, 4, 5], target: 0 },
            { group: [6, 7, 8, 9], target: 1 },
          ],
          clusterIDSwaps: [
            [1, 9],
            [3, 8],
            [5, 7],
            [5, 6],
            [1, 5],
            [2, 4],
            [2, 3],
          ],
        },
      },
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
