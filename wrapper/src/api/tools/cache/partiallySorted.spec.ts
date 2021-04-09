import { PartiallySortedCache } from './partiallySorted';

type CacheTestCase = {
  keys: {
    key: number[][];
    targetKey: number[][];
  }[];
  entangledKeys: { toSort: number[]; sortBy: number }[];
};

describe.each([
  {
    keys: [
      {
        key: [
          [3, 2, 1],
          [1, 2, 3],
          [8, 2, 5],
          [1, 3, 2],
          [1, 2, 3],
        ],
        targetKey: [
          [1, 2, 3],
          [3, 2, 1],
          [8, 2, 5],
          [1, 2, 3],
          [1, 3, 2],
        ],
      },
      {
        key: [[], [], [], [], []],
        targetKey: [[], [], [], [], []],
      },
    ],
    entangledKeys: [
      {
        sortBy: 0,
        toSort: [0, 1],
      },
      { sortBy: 3, toSort: [3, 4] },
    ],
  },
  {
    entangledKeys: [],
    keys: [
      {
        key: [[1, 2, 5, 4]],
        targetKey: [[1, 2, 5, 4]],
      },
    ],
  },
] as CacheTestCase[])('Cache', (testCase: CacheTestCase) => {
  test('sorts items in correct order', () => {
    let nextTestCase: CacheTestCase['keys'][number]['targetKey'];
    new PartiallySortedCache(
      (...key: CacheTestCase['keys'][number]['key']) =>
        expect(key).toEqual(nextTestCase),
      testCase.entangledKeys
    );
  });
});
