import { Experiment } from 'api';
import { IntersectionVennDiagramConfigStrategy } from 'components/IntersectionVennDiagram/config';

// Ionic Colors: themes/variables.css
export const IRRELEVANT_COLOR = '#222428';
export const INCLUDED_COLOR = '#2dd36f';
export const EXCLUDED_COLOR = '#eb445a';

export class IntersectionVennDiagramIntersectionStrategy
  implements IntersectionVennDiagramConfigStrategy {
  protected readonly includedSet: Set<number>;
  protected readonly excludedSet: Set<number>;
  protected readonly included: number[];
  protected readonly excluded: number[];

  constructor(included: Experiment[], excluded: Experiment[]) {
    this.included = included.map(({ id }) => id);
    this.excluded = excluded.map(({ id }) => id);
    this.includedSet = new Set(this.included);
    this.excludedSet = new Set(this.excluded);
  }

  color(experiments: Experiment[]): string | undefined {
    const experimentIds = experiments.map(({ id }) => id);
    const experimentsSet = new Set(experimentIds);
    if (experiments.find(({ id }) => this.excludedSet.has(id))) {
      return EXCLUDED_COLOR;
    } else if (this.included.every((id) => experimentsSet.has(id))) {
      return INCLUDED_COLOR;
    } else {
      return experiments.length === 1 ? IRRELEVANT_COLOR : undefined;
    }
  }

  opacity(experiment: Experiment): number | undefined {
    if (this.excludedSet.has(experiment.id)) {
      return 1;
    } else if (this.included.every((id) => id === experiment.id)) {
      return 1;
    } else {
      return 0.4;
    }
  }

  get backgroundColor(): string | undefined {
    return this.included.length === 0 ? INCLUDED_COLOR : undefined;
  }
  backgroundOpacity = 0.3;
}
