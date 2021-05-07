import { Metric } from '../../../../server/types';
import {
  ExpertiseWeightedEffort,
  HRAmountWeightedEffort,
  ManhattanDistance,
  MultiplyEffort,
} from './';

export function calculateEffort(expertise: number, hrAmount: number): Metric[] {
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
