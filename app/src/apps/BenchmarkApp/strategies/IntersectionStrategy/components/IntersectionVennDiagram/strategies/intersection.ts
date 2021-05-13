import { IntersectionVennDiagramConfigStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/config';
import { experimentEntitiesEqual } from 'apps/BenchmarkApp/utils/experimentEntity';
import { ExperimentEntity } from 'types/ExperimentEntity';

// Ionic Colors: themes/variables.css
export const IRRELEVANT_COLOR = '#92949c';
export const INCLUDED_COLOR = '#2dd36f';
export const INCLUDED_COLOR_BG = 'rgba(45, 211, 111, 0.3)';
export const EXCLUDED_COLOR = '#eb445a';

export class IntersectionVennDiagramIntersectionStrategy
  implements IntersectionVennDiagramConfigStrategy {
  protected readonly included: ExperimentEntity[];
  protected readonly excluded: ExperimentEntity[];
  protected readonly irrelevant: ExperimentEntity[];

  constructor(
    included: ExperimentEntity[],
    excluded: ExperimentEntity[],
    irrelevant: ExperimentEntity[]
  ) {
    this.included = [...included];
    this.excluded = [...excluded];
    this.irrelevant = [...irrelevant];
  }

  color(experiments: ExperimentEntity[]): string | undefined {
    const isIncluded = this.included.every((entity) =>
      experiments.find((experiment) =>
        experimentEntitiesEqual(entity, experiment)
      )
    );
    const isExcluded = !!experiments.find((entity) =>
      this.excluded.find((entity2) => experimentEntitiesEqual(entity, entity2))
    );
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

  opacity(experiment: ExperimentEntity): number | undefined {
    const isIncluded = this.included.every((entity) =>
      experimentEntitiesEqual(experiment, entity)
    );
    const isSmallestIncluded = isIncluded && this.included.length === 1;
    const isExcluded = !!this.excluded.find((entity) =>
      experimentEntitiesEqual(entity, experiment)
    );
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
