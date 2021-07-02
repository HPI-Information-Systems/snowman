import { GoldStandardId } from 'snowman-library';
import { assertType } from 'snowman-library';

import { providers } from '../../../providers';
import { AlgorithmId, AlgorithmValues } from '../../../server/types';

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
  gold: {
    meta: {
      name: 'Echte Duplikate',
      description: 'vollständige Liste aller echten Duplikte',
    },
    id: GoldStandardId,
  },
  alpha: {
    meta: {
      name: 'Alpha',
      description: 'ein open-source System zum Finden von Duplikaten',
      softKPIs: {
        // TODO SoftKPIs here
      },
    },
    id: 1,
  },
  beta: {
    meta: {
      name: 'Beta',
      description: 'kommerzielle Duplikaterkennungslösung',
    },
    id: 2,
  },
});
