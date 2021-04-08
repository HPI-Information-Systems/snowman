import { Experiment } from 'api';
import { IntersectionVennDiagramConfigStrategy } from 'components/IntersectionVennDiagram/config';

// Ionic Colors: themes/variables.css
export const IRRELEVANT_COLOR = '#92949c';
export const INCLUDED_COLOR = '#2dd36f';
export const INCLUDED_COLOR_BG = 'rgba(45, 211, 111, 0.3)';
export const EXCLUDED_COLOR = '#eb445a';

export class IntersectionVennDiagramIntersectionStrategy
  implements IntersectionVennDiagramConfigStrategy {
  protected readonly includedSet: Set<number>;
  protected readonly excludedSet: Set<number>;
  protected readonly included: number[];
  protected readonly excluded: number[];
  protected readonly irrelevant: number[];

  constructor(
    included: Experiment[],
    excluded: Experiment[],
    irrelevant: Experiment[]
  ) {
    this.included = included.map(({ id }) => id);
    this.excluded = excluded.map(({ id }) => id);
    this.irrelevant = irrelevant.map(({ id }) => id);
    this.includedSet = new Set(this.included);
    this.excludedSet = new Set(this.excluded);
  }

  color(experiments: Experiment[]): string | undefined {
    const experimentIds = experiments.map(({ id }) => id);
    const experimentsSet = new Set(experimentIds);

    const isIncluded = this.included.every((id) => experimentsSet.has(id));
    const isExcluded = !!experiments.find(({ id }) => this.excludedSet.has(id));
    const omegaIsIncluded = this.included.length === 0;
    const isIntersection = experiments.length > 1;

    if (isIncluded) {
      if (isExcluded) {
        return EXCLUDED_COLOR;
      } else {
        if (omegaIsIncluded && isIntersection) {
          return undefined;
        } else {
          return INCLUDED_COLOR;
        }
      }
    } else {
      if (isIntersection) {
        return undefined;
      } else {
        if (isExcluded) {
          return EXCLUDED_COLOR;
        } else {
          return IRRELEVANT_COLOR;
        }
      }
    }
  }

  opacity(experiment: Experiment): number | undefined {
    const isIncluded = this.included.every((id) => experiment.id === id);
    const isSmallestIncluded = isIncluded && this.included.length === 1;
    const isExcluded = this.excludedSet.has(experiment.id);
    if (isIncluded) {
      if (isExcluded) {
        return 1;
      } else {
        if (isSmallestIncluded) {
          return 1;
        } else {
          return 0.4;
        }
      }
    } else {
      return 0.4;
    }
  }

  get backgroundColor(): string | undefined {
    return this.included.length === 0 ? INCLUDED_COLOR_BG : undefined;
  }
}
