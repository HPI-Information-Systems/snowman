import { Cache } from '../cache';
import { compareArrays } from '../comparators';
import { shuffleArray } from './shuffleArray';

type CacheTestCase = number[][][];

function sortTestCase(testCase: CacheTestCase) {
  return testCase.map((key) => key.map((subKey) => subKey.slice().sort()));
}

function expectTestCasesEqual(
  testCase1: CacheTestCase,
  testCase2: CacheTestCase
) {
  expect(compareArrays(sortTestCase(testCase1), sortTestCase(testCase2))).toBe(
    0
  );
}

describe.each([
  [],
  [
    [],
    [[]],
    [[], []],
    [[1]],
    [[1, 2]],
    [[-100]],
    [[1, 1, 1]],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  ],
  [[[14235424]], [[21233665784567]], [[123123], [], [1534573], [], []]],
  [
    [[], [1, 5, 2, 8]],
    [[1], [1, 5, 2, 8]],
  ],
] as CacheTestCase[])('Cache', (...testCase: CacheTestCase) => {
  let cache: Cache<number, number, number[][]>;
  let created: CacheTestCase;

  function cacheTestCase(_testCase = testCase) {
    for (const key of _testCase) {
      cache.get(...key);
    }
  }

  beforeEach(() => {
    created = [];
    cache = new Cache<number, number, number[][]>((...key) =>
      created.push(key)
    );
    cacheTestCase();
  });

  test('only instantiates needed items', () => {
    expectTestCasesEqual(testCase, created);
  });

  test('reuses existing items', () => {
    created = [];
    cacheTestCase();
    expect(created.length).toBe(0);
  });

  test('ignores order', () => {
    for (let NUMBER_RUNS = 5; NUMBER_RUNS > 0; --NUMBER_RUNS) {
      created = [];
      cacheTestCase(
        testCase.map((key) => key.map((subKey) => shuffleArray(subKey.slice())))
      );
      expect(created.length).toBe(0);
    }
  });
});
