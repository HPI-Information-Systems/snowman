import { Experiment, ExperimentIntersectionPairCountsItem } from 'api';
import {
  VennDiagramEntity,
  VennDiagramIntersection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';
import { VennDiagramConfig } from 'components/VennDiagram/VennDiagramProps';
import { intersectionDescription } from 'utils/intersectionDescription';

type PartialVennDiagramConfig = {
  [x: string]: VennDiagramSet | VennDiagramIntersection;
} & VennDiagramConfig;

export interface IntersectionVennDiagramConfigStrategy {
  backgroundColor: string | undefined;
  backgroundOpacity: number | undefined;
  color(experiments: Experiment[]): string | undefined;
  opacity(experiment: Experiment): number | undefined;
}

export class IntersectionVennDiagramConfig {
  protected readonly intersectionCounts: ExperimentIntersectionPairCountsItem[];
  protected readonly experimentCounts: ExperimentIntersectionPairCountsItem[];
  protected readonly experimentsMap: Map<number, Experiment>;

  constructor(
    protected readonly experiments: Experiment[],
    counts: ExperimentIntersectionPairCountsItem[],
    protected readonly select: (experiments: Experiment[]) => void
  ) {
    this.experimentsMap = new Map(
      experiments.map((experiment) => [experiment.id, experiment])
    );
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
      text: experiment.name,
      opacity: strategy.opacity(experiment),
    }));
  }

  protected intersectionConfig(
    strategy: IntersectionVennDiagramConfigStrategy
  ): PartialVennDiagramConfig {
    return this.mapCounts(this.intersectionCounts, strategy, () => ({}));
  }

  protected mapCounts(
    counts: ExperimentIntersectionPairCountsItem[],
    strategy: IntersectionVennDiagramConfigStrategy,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: (experiments: Experiment[], numberPairs: number) => Record<string, any>
  ): PartialVennDiagramConfig {
    return Object.fromEntries(
      counts.map(({ experiments, numberPairs }) => {
        const experimentObjects = experiments.map(({ experimentId }) => {
          const experiment = this.experimentsMap.get(experimentId);
          if (!experiment) {
            throw new Error('Unselected experiment in pair counts.');
          }
          return experiment;
        });

        return [
          this.serialize(experimentObjects),
          {
            tooltip: intersectionDescription({
              included: experimentObjects.map(({ name }) => name),
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

  protected serialize(experiments: Experiment[]): string {
    const activeExperiments = new Set(
      experiments.map((experiment) => experiment.id)
    );
    let serialized = 'x';
    for (const { id } of this.experiments) {
      serialized += activeExperiments.has(id) ? '1' : '0';
    }
    return serialized;
  }
}
