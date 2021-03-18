import { Algorithm } from 'api';

import { MagicNotPossibleId } from '../structs/constants';

export const getAlgorithmTagFromId = (
  anId: number,
  algorithms: Algorithm[]
): string =>
  algorithms.find((anAlgorithm: Algorithm): boolean => anAlgorithm.id === anId)
    ?.name ?? 'Unknown';

export const getAlgorithmIdFromTag = (
  aTag: string,
  algorithms: Algorithm[]
): number =>
  algorithms.find(
    (anAlgorithm: Algorithm): boolean => anAlgorithm.name === aTag
  )?.id ?? MagicNotPossibleId;
