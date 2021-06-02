import { ExperimentIntersectionCount } from 'api';
import {
  experimentConfigItemsEqual,
  experimentEntitiesEqual,
  experimentEntityToExperimentConfigItem,
  stringifyExperimentEntity,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import {
  VennDiagramEntity,
  VennDiagramIntersection,
  VennDiagramSet,
} from 'components/simple/VennDiagram/venn/types/types';
import { VennDiagramConfig } from 'components/simple/VennDiagram/VennDiagramProps';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { intersectionDescription } from 'utils/intersectionHelpers';

type PartialVennDiagramConfig = {
  [x: string]: VennDiagramSet | VennDiagramIntersection;
} & VennDiagramConfig;

export interface IntersectionVennDiagramConfigStrategy {
  backgroundColor: string | undefined;
  color(experiments: ExperimentEntity[]): string | undefined;
  opacity(experiment: ExperimentEntity): number | undefined;
}

export class IntersectionVennDiagramConfig {
  protected readonly intersectionCounts: ExperimentIntersectionCount[];
  protected readonly experimentCounts: ExperimentIntersectionCount[];

  constructor(
    protected readonly experiments: ExperimentEntity[],
    counts: ExperimentIntersectionCount[],
    protected readonly select: (experiments: ExperimentEntity[]) => void
  ) {
    const relevantCounts = counts.filter(({ experiments }) =>
      experiments.every(({ predictedCondition }) => predictedCondition)
    );
    this.intersectionCounts = relevantCounts.filter(
      ({ experiments }) => experiments.length > 1
    );
    this.experimentCounts = relevantCounts.filter(
      ({ experiments }) => experiments.length === 1
    );
  }

  config(strategy: IntersectionVennDiagramConfigStrategy): VennDiagramConfig {
    return {
      ...this.experimentConfig(strategy),
      ...this.intersectionConfig(strategy),
    } as VennDiagramConfig;
  }

  protected get dimension(): number {
    return this.experiments.length;
  }

  protected experimentConfig(
    strategy: IntersectionVennDiagramConfigStrategy
  ): PartialVennDiagramConfig {
    return this.mapCounts(this.experimentCounts, strategy, ([experiment]) => ({
      text: stringifyExperimentEntity(experiment),
      opacity: strategy.opacity(experiment),
    }));
  }

  protected intersectionConfig(
    strategy: IntersectionVennDiagramConfigStrategy
  ): PartialVennDiagramConfig {
    return this.mapCounts(this.intersectionCounts, strategy, () => ({}));
  }

  protected mapCounts(
    counts: ExperimentIntersectionCount[],
    strategy: IntersectionVennDiagramConfigStrategy,
    map: (
      experiments: ExperimentEntity[],
      numberPairs: number
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Record<string, any>
  ): PartialVennDiagramConfig {
    return Object.fromEntries(
      counts.map(({ experiments, numberPairs }) => {
        const experimentObjects = experiments.map((searchEntity) => {
          const experiment = this.experiments.find((entity) =>
            experimentConfigItemsEqual(
              experimentEntityToExperimentConfigItem(entity),
              searchEntity
            )
          );
          if (!experiment) {
            throw new Error('Unselected experiment in pair counts.');
          }
          return experiment;
        });

        return [
          this.serialize(experimentObjects),
          {
            tooltip: intersectionDescription({
              included: experimentObjects.map((entity) =>
                stringifyExperimentEntity(entity)
              ),
              pairCount: numberPairs,
            }),
            callback: () => this.select(experimentObjects),
            color: strategy.color(experimentObjects),
            ...map(experimentObjects, numberPairs),
          } as VennDiagramEntity,
        ];
      })
    ) as PartialVennDiagramConfig;
  }

  protected serialize(activeExperiments: ExperimentEntity[]): string {
    let serialized = 'x';
    for (const entity of this.experiments) {
      serialized +=
        activeExperiments.find((entity2) =>
          experimentEntitiesEqual(entity, entity2)
        ) !== undefined
          ? '1'
          : '0';
    }
    return serialized;
  }
}
