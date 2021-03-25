import { AlgorithmConverter } from '../../../providers/algorithm/util/converter';
import { Algorithm } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleAlgorithms, exampleAlgorithms } from './algorithms';

const algorithmConverter = new AlgorithmConverter();

export const expectedAlgorithms = Object.values(
  exampleAlgorithms as ExampleAlgorithms
)
  .map(
    ({ id, meta }) =>
      ({
        id,
        ...meta,
      } as Algorithm)
  )
  .map(algorithmConverter.apiToStored.bind(algorithmConverter))
  .map(algorithmConverter.storedToApi.bind(algorithmConverter))
  .sort(idSorter);
