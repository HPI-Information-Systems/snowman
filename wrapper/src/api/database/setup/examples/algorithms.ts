import { getProviders } from '../../../providers';
import { AlgorithmId, AlgorithmValues } from '../../../server/types';
import { assertType } from '../../../tools/types';

export type ExampleAlgorithms = {
  [key: string]: {
    meta: AlgorithmValues;
    id: AlgorithmId;
  };
};

export function loadExampleAlgorithms(algorithms: ExampleAlgorithms): void {
  const algorithmProvider = getProviders().algorithm;
  for (const { id, meta } of Object.values(algorithms)) {
    algorithmProvider.setAlgorithm(id, meta);
  }
}

export const exampleAlgorithms = assertType<ExampleAlgorithms>()({
  silver: {
    meta: {
      name: 'Silver Standard',
      description: 'Incomplete list of all duplicates a dataset contains.',
    },
    id: 1,
  },
  gold: {
    meta: {
      name: 'Gold Standard',
      description: 'Complete list of all duplicates a dataset contains.',
    },
    id: 2,
  },
  mock: {
    meta: {
      name: 'Mock Solution',
      description: 'Experiments constructed for testing purposes only.',
    },
    id: 3,
  },
});
