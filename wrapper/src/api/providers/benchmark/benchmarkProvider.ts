import {
  CalculateDiagramDataRequest,
  DiagramCoordinates,
  DiagramExperimentItem,
  DiagramResponse,
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
import { DiagramDataProvider, getDiagramDataProvider } from './diagram';
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
    diagram,
  }: CalculateDiagramDataRequest): DiagramResponse {
    if (diagram === undefined) {
      throw new Error('No experiments have been sent!');
    }

    const xGetter: DiagramDataProvider = getDiagramDataProvider(xAxis);
    const yGetter: DiagramDataProvider = getDiagramDataProvider(yAxis);
    const definitionRange: [number, number] | undefined = xGetter.getRange(
      xAxis
    );
    const valueRange: [number, number] | undefined = yGetter.getRange(yAxis);
    if (
      isInEnum(MetricsEnum, xAxis) &&
      isInEnum(MetricsEnum, yAxis) &&
      diagram.similarityThresholds
    ) {
      const datasetId = datasetFromExperimentIds([
        diagram.similarityThresholds.experimentId,
      ]).id;
      const X = xAxis === 'similarity' ? 'similarity' : metricsMap.get(xAxis);
      const Y = yAxis === 'similarity' ? 'similarity' : metricsMap.get(yAxis);
      const experimentId = diagram.similarityThresholds.experimentId;
      const groundTruth = [diagram.similarityThresholds.groundTruthId];
      const steps = diagram.similarityThresholds.steps;
      const func = diagram.similarityThresholds.func;
      if (!X || !Y)
        throw new Error(`At least one metric to be plotted does not exist!`);
      const coordinates = plot({
        X,
        Y,
        datasetId,
        experimentId,
        groundTruth,
        steps,
        func,
      });
      return { coordinates, definitionRange, valueRange };
    }
    if (!diagram.multipleExperiments) throw new Error('S');

    const coordinates = diagram.multipleExperiments
      .map((experiment: DiagramExperimentItem) => {
        const x = xGetter.getData(xAxis, experiment);
        const y = yGetter.getData(yAxis, experiment);
        return {
          experimentId: experiment.experiment.experimentId,
          x,
          y,
        };
      })
      .sort(({ x: x1 }, { x: x2 }) => x1 - x2);
    return { coordinates, definitionRange, valueRange };
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

      const intersection = IntersectionCache.get({
        datasetId,
        included: included,
        excluded: excluded,
      });
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
        numberPairs: intersection.numberPairs,
        numberRows: intersection.numberRows,
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
      .map((Metric) => {
        const { value, formula, name, info, infoLink } = new Metric(matrix);
        return {
          range: Metric.range,
          value,
          formula,
          name,
          info,
          infoLink,
        };
      })
      .map(({ value, formula, name, range, info, infoLink }) => {
        return {
          formula,
          info,
          infoLink,
          name,
          range,
          value,
        };
      });
  }

  protected intersection(
    experiments: ExperimentIntersectionItem[]
  ): IntersectionBase {
    return IntersectionCache.get({
      datasetId: datasetFromExperimentIds(
        experiments.map(({ experimentId }) => experimentId)
      ).id,
      excluded: experiments.filter(
        ({ predictedCondition }) => !predictedCondition
      ),
      included: experiments.filter(
        ({ predictedCondition }) => predictedCondition
      ),
    });
  }
}
