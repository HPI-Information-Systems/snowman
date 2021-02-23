import { Algorithm } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleAlgorithms, exampleAlgorithms } from './algorithms';

export const expectedAlgorithms = Object.values(
  exampleAlgorithms as ExampleAlgorithms
)
  .map(({ id, meta }) => {
    return {
      id,
      ...meta,
    } as Algorithm;
  })
  .sort(idSorter);
