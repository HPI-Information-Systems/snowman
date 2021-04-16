import { GoldStandardId, SilverStandardId } from 'snowman-library';

import { providers } from '../../../providers';
import { AlgorithmId, AlgorithmValues } from '../../../server/types';
import { assertType } from '../../../tools/types';

export type ExampleAlgorithms = {
  [key: string]: {
    meta: AlgorithmValues;
    id: AlgorithmId;
  };
};

export function loadExampleAlgorithms(algorithms: ExampleAlgorithms): void {
  const algorithmProvider = providers.algorithm;
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
    id: SilverStandardId,
  },
  gold: {
    meta: {
      name: 'Gold Standard',
      description: 'Complete list of all duplicates a dataset contains.',
    },
    id: GoldStandardId,
  },
  mock: {
    meta: {
      name: 'Mock Solution',
      description: 'Experiments constructed for testing purposes only.',
    },
    id: -3,
  },
});
