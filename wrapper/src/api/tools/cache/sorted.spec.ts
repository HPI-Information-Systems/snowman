import { compareArrays } from '../comparators';
import { shuffleArray } from '../test/shuffleArray';
import { SortedCache } from './sorted';

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

const ONE_TEST_ID = 1;

describe.each([
  [],
  [
    [],
    [[]],
    [[], []],
    [[ONE_TEST_ID]],
    [[ONE_TEST_ID, 2]],
    [[-100]],
    [[ONE_TEST_ID, ONE_TEST_ID, ONE_TEST_ID]],
    [
      [ONE_TEST_ID, 2, 3, 4],
      [ONE_TEST_ID, 2, 3, 4],
    ],
  ],
  [[[14235424]], [[21233665784567]], [[123123], [], [1534573], [], []]],
  [
    [[], [ONE_TEST_ID, 5, 2, 8]],
    [[ONE_TEST_ID], [ONE_TEST_ID, 5, 2, 8]],
  ],
] as CacheTestCase[])('Cache', (...testCase: CacheTestCase) => {
  let cache: SortedCache<number, number, number[][]>;
  let created: CacheTestCase;

  function cacheTestCase(_testCase = testCase) {
    for (const key of _testCase) {
      cache.get(...key);
    }
  }

  beforeEach(() => {
    created = [];
    cache = new SortedCache<number, number, number[][]>((...key) =>
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

  test('clear resets cache', () => {
    cache.clear();
    created = [];
    cacheTestCase();
    expectTestCasesEqual(testCase, created);
  });

  test('invalidate clears all and only required caches', () => {
    cache.invalidate(ONE_TEST_ID);
    created = [];
    cacheTestCase();
    const toBeRecreated = testCase.filter((keys) =>
      keys.flat().includes(ONE_TEST_ID)
    );
    expectTestCasesEqual(toBeRecreated, created);
  });
});
