import { Metric } from '../../../../server/types';
import {
  ExpertiseWeightedEffort,
  HRAmountWeightedEffort,
  ManhattanDistance,
  MultiplyEffort,
} from './';

export function calculateEffort(
  expertise: number | null | undefined,
  hrAmount: number | null | undefined
): Metric[] | undefined {
  if (typeof expertise !== 'number' || typeof hrAmount !== 'number') {
    return undefined;
  }

  const efforts = [
    ManhattanDistance,
    ExpertiseWeightedEffort,
    HRAmountWeightedEffort,
    MultiplyEffort,
  ];
  return efforts
    .map((Effort) => new Effort(expertise, hrAmount))
    .map(({ id, value, formula, name, info, infoLink }) => {
      return {
        id,
        formula,
        name,
        value,
        info,
        infoLink,
      };
    });
}
