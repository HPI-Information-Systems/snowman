import { Algorithm } from 'api';

export const isPredefinedAlgorithm = (anAlgorithm: Algorithm): boolean =>
  anAlgorithm.id < 0;
