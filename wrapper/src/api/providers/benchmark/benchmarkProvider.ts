import {
  CalculateDiagramDataRequest,
  DiagramCoordinate,
  ExperimentConfigItem,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
  FileResponse,
  MetricsEnum,
} from '../../server/types';
import { Metric } from '../../server/types';
import { ConfusionMatrixCache } from './cache/flavors/confusionMatrixCache';
import { IntersectionCache } from './cache/flavors/intersectionCache';
import { datasetFromExperimentIds } from './datasetFromExperiments';
import {
  DiagramDataProvider,
  getDiagramDataProvider,
} from './diagram/diagramDataProvider';
import { idClustersToRecordClusters } from './idsToRecords';
import { IntersectionBase } from './intersection/intersectionBase';
import { metrics, metricsMap } from './metrics/allMetrics';
import { plot } from './metrics/plot/plot';
import { isInEnum } from './util/enumChecker';

enum ExperimentState {
  IRRELEVANT,
  INCLUDED,
  EXCLUDED,
}
const states = [
  ExperimentState.IRRELEVANT,
  ExperimentState.INCLUDED,
  ExperimentState.EXCLUDED,
];

export class BenchmarkProvider {
  calculateDiagramData({
    xAxis,
    yAxis,
    steps,
    diagramExperimentItem,
  }: CalculateDiagramDataRequest): Array<DiagramCoordinate> {
    if (diagramExperimentItem === undefined) {
      throw new Error('Missing experiments!');
    }
    if (isInEnum(MetricsEnum, xAxis) && isInEnum(MetricsEnum, yAxis)) {
      const datasetId = datasetFromExperimentIds([
        diagramExperimentItem[0].experiment.experimentId,
        diagramExperimentItem[0].groundTruth.experimentId,
      ]).id;
      const X = xAxis === 'similarity' ? 'similarity' : metricsMap.get(xAxis);
      const Y = yAxis === 'similarity' ? 'similarity' : metricsMap.get(yAxis);
      const experimentId = diagramExperimentItem[0].experiment.experimentId;
      const groundTruth = [diagramExperimentItem[0].groundTruth.experimentId];
      const func = diagramExperimentItem[0].experiment.similarity?.func;
      if (!func)
        throw new Error(
          `A similarity function for experiment ${diagramExperimentItem[0].experiment.experimentId} does not exist!`
        );
      if (!X || !Y)
        throw new Error(`At least one metric to be plotted does not exist!`);
      if (!steps) {
        throw new Error(`Steps not specified!`);
      }

      return plot({ X, Y, datasetId, experimentId, groundTruth, steps, func });
    }

    const xGetter: DiagramDataProvider = getDiagramDataProvider(xAxis);
    const yGetter: DiagramDataProvider = getDiagramDataProvider(yAxis);
    return diagramExperimentItem
      .map((experiment) => {
        return {
          x: xGetter.getData(xAxis, experiment),
          y: yGetter.getData(yAxis, experiment),
        };
      })
      .sort(({ x: x1 }, { x: x2 }) => x1 - x2);
  }
  calculateExperimentIntersectionCount({
    intersection: experiments,
  }: {
    intersection: ExperimentIntersectionItem[];
  }): ExperimentIntersectionCount {
    const intersection = this.intersection(experiments);
    return {
      experiments,
      numberPairs: intersection.numberPairs,
      numberRows: intersection.numberRows,
    };
  }

  protected idsAndSimilarity(
    targetState: ExperimentState,
    experiments: ExperimentConfigItem[],
    state: ExperimentState[]
  ): ExperimentConfigItem[] {
    return state
      .map((state, index) =>
        state === targetState ? experiments[index] : undefined
      )
      .filter((index) => index !== undefined) as ExperimentConfigItem[];
  }

  calculateExperimentIntersectionCounts(
    experiments: ExperimentConfigItem[]
  ): ExperimentIntersectionCount[] {
    const datasetId = datasetFromExperimentIds(
      experiments.map(({ experimentId }) => experimentId)
    ).id;

    const state = experiments.map(() => ExperimentState.IRRELEVANT);
    const counts: ExperimentIntersectionCount[] = [];
    function nextState() {
      let index = 0;
      do {
        state[index]++;
        if (state[index] === states.length) {
          state[index] = 0;
        } else {
          return true;
        }
      } while (++index < state.length);
      return false;
    }
    // eslint-disable-next-line no-constant-condition
    do {
      const included = this.idsAndSimilarity(
        ExperimentState.INCLUDED,
        experiments,
        state
      );
      const excluded = this.idsAndSimilarity(
        ExperimentState.EXCLUDED,
        experiments,
        state
      );

      counts.push({
        experiments: [
          ...included.map((experiment) => {
            return {
              ...experiment,
              predictedCondition: true,
            };
          }),
          ...excluded.map((experiment) => {
            return {
              ...experiment,
              predictedCondition: false,
            };
          }),
        ],
        numberPairs: IntersectionCache.get({
          datasetId,
          included: included,
          excluded: excluded,
        }).numberPairs,
        numberRows: IntersectionCache.get({
          datasetId,
          included: included,
          excluded: excluded,
        }).numberRows,
      });
    } while (nextState());
    return counts;
  }

  calculateExperimentIntersectionRecords({
    intersection: experiments,
    startAt,
    limit,
  }: {
    intersection: ExperimentIntersectionItem[];
    startAt?: number;
    limit?: number;
  }): FileResponse {
    const intersection = this.intersection(experiments);
    return idClustersToRecordClusters(
      intersection.rows(startAt, limit),
      datasetFromExperimentIds(
        experiments.map(({ experimentId }) => experimentId)
      ).id
    );
  }

  getBinaryMetrics(
    groundTruthExperiment: ExperimentConfigItem,
    predictedExperiment: ExperimentConfigItem
  ): Metric[] {
    const datasetId = datasetFromExperimentIds([
      groundTruthExperiment.experimentId,
      predictedExperiment.experimentId,
    ]).id;

    const matrix = ConfusionMatrixCache.get({
      datasetId,
      predicted: [predictedExperiment],
      groundTruth: [groundTruthExperiment],
    }).confusionMatrix;
    return metrics
      .map((Metric) => new Metric(matrix))
      .map(({ value, formula, name, range, info, infoLink }) => {
        return {
          value,
          formula,
          name,
          range,
          info,
          infoLink,
        };
      });
  }

  protected intersection(
    experiments: ExperimentIntersectionItem[]
  ): IntersectionBase {
    const included = experiments.filter(
      ({ predictedCondition }) => predictedCondition
    );
    const excluded = experiments.filter(
      ({ predictedCondition }) => !predictedCondition
    );
    return IntersectionCache.get({
      datasetId: datasetFromExperimentIds(
        experiments.map(({ experimentId }) => experimentId)
      ).id,
      excluded: excluded,
      included: included,
    });
  }
}
