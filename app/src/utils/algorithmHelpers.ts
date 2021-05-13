import { Algorithm } from 'api';
import { MagicNotPossibleId } from 'structs/constants';

export const getAlgorithmNameFromId = (
  anId: number,
  algorithms: Algorithm[]
): string =>
  algorithms.find((anAlgorithm: Algorithm): boolean => anAlgorithm.id === anId)
    ?.name ?? 'Unknown';

export const getAlgorithmIdFromName = (
  aName: string,
  algorithms: Algorithm[]
): number =>
  algorithms.find(
    (anAlgorithm: Algorithm): boolean => anAlgorithm.name === aName
  )?.id ?? MagicNotPossibleId;

export const isMatchingSolutionSelected = (
  aMatchingSolution: Algorithm,
  selectedMatchingSolutions: Algorithm[]
): boolean =>
  selectedMatchingSolutions.find(
    (oneMatchingSolution: Algorithm): boolean =>
      oneMatchingSolution.id === aMatchingSolution.id
  ) !== undefined;

export const isPredefinedAlgorithm = (anAlgorithm: Algorithm): boolean =>
  anAlgorithm.id < 0;
