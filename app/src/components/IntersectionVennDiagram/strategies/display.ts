import { Experiment } from '../../../api';
import { IntersectionVennDiagramConfigStrategy } from '../config';

const irrelevantColor = '#000000';
const includedColor = '#00FF00';
const excludedColor = '#FF0000';

export class IntersectionVennDiagramDisplayStrategy
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
      return excludedColor;
    } else if (this.included.every((id) => experimentsSet.has(id))) {
      return includedColor;
    } else {
      return irrelevantColor;
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
}
