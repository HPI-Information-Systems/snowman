import {
  CalculateDiagramDataRequest,
  DiagramCoordinates,
  ExperimentConfigItem,
  ExperimentId,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
  FileResponse,
  MetricsEnum,
  SoftKPIsExperimentEnum,
} from '../../server/types';
import { Metric } from '../../server/types';
import { datasetFromExperimentIds } from './datasetFromExperiments';
import { DiagramDataGetter } from './diagram/diagramGetter';
import { DiagramMetricsGetter } from './diagram/diagramMetricsGetter';
import { DiagramSoftKPIsGetter } from './diagram/diagramSoftKPIsGetter';
import { idClustersToRecordClusters } from './idsToRecords';
import { Intersection, IntersectionCache } from './intersection';
import {
  Accuracy,
  BalancedAccuracy,
  BookmakerInformedness,
  F1Score,
  FalseDiscoveryRate,
  FalseNegativeRate,
  FalseOmissionRate,
  FalsePositiveRate,
  FowlkesMallowsIndex,
  FStarScore,
  Markedness,
  MatthewsCorrelationCoefficient,
  NegativePredictiveValue,
  Precision,
  PrevalenceThreshold,
  Recall,
  Specificity,
  ThreatScore,
} from './metrics';
import { ConfusionMatrix } from './metrics/confusionMatrix';
import { isInEnum } from './utils/enumChecker';

export class BenchmarkProvider {
  calculateDiagramData({
    xAxis,
    yAxis,
    diagramExperimentItem,
  }: CalculateDiagramDataRequest): DiagramCoordinates {
    console.log(diagramExperimentItem);
    let xGetter: DiagramDataGetter;
    let yGetter: DiagramDataGetter;
    if (isInEnum(MetricsEnum, xAxis) && isInEnum(MetricsEnum, yAxis)) {
      console.log('HALLOE');
      //do crazy stuff with prec-recall-diagrams SPECIAL case
    }
    if (
      isInEnum(SoftKPIsExperimentEnum, xAxis) &&
      isInEnum(MetricsEnum, yAxis)
    ) {
      xGetter = new DiagramSoftKPIsGetter();
      yGetter = new DiagramMetricsGetter();
    }
    if (
      isInEnum(MetricsEnum, xAxis) &&
      isInEnum(SoftKPIsExperimentEnum, yAxis)
    ) {
      xGetter = new DiagramMetricsGetter();
      yGetter = new DiagramSoftKPIsGetter();
    }
    if (
      isInEnum(SoftKPIsExperimentEnum, xAxis) &&
      isInEnum(SoftKPIsExperimentEnum, yAxis)
    ) {
      xGetter = new DiagramSoftKPIsGetter();
      yGetter = new DiagramSoftKPIsGetter();
    }

    const x: Array<number> = [];
    const y: Array<number> = [];

    diagramExperimentItem.forEach((item) => {
      x.push(xGetter.getData(xAxis, item));
      y.push(yGetter.getData(yAxis, item));
    });

    return {
      x,
      y,
    };
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
      numberRows: intersection.rowCount,
    };
  }

  calculateExperimentIntersectionCounts(
    experiments: ExperimentConfigItem[]
  ): ExperimentIntersectionCount[] {
    const datasetId = datasetFromExperimentIds(
      experiments.map(({ experimentId }) => experimentId)
    ).id;
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
      const included = state
        .map((state, index) =>
          state === ExperimentState.INCLUDED
            ? experiments[index].experimentId
            : undefined
        )
        .filter((index) => index !== undefined) as ExperimentId[];
      const excluded = state
        .map((state, index) =>
          state === ExperimentState.EXCLUDED
            ? experiments[index].experimentId
            : undefined
        )
        .filter((index) => index !== undefined) as ExperimentId[];
      counts.push({
        experiments: [
          ...included.map((experimentId) => {
            return {
              experimentId,
              predictedCondition: true,
            };
          }),
          ...excluded.map((experimentId) => {
            return {
              experimentId,
              predictedCondition: false,
            };
          }),
        ],
        numberPairs: IntersectionCache.get(included, excluded, [datasetId])
          .numberPairs,
        numberRows: IntersectionCache.get(included, excluded, [datasetId])
          .rowCount,
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
      intersection.clusters(startAt, limit),
      datasetFromExperimentIds(
        experiments.map(({ experimentId }) => experimentId)
      ).id
    );
  }

  getBinaryMetrics(
    groundTruthExperimentId: ExperimentId,
    predictedExperimentId: ExperimentId
  ): Metric[] {
    const datasetId = datasetFromExperimentIds([
      groundTruthExperimentId,
      predictedExperimentId,
    ]).id;
    const metrics = [
      Accuracy,
      Precision,
      Recall,
      F1Score,
      FStarScore,

      FalsePositiveRate,
      FalseNegativeRate,
      FalseDiscoveryRate,
      FalseOmissionRate,
      NegativePredictiveValue,
      Specificity,

      BalancedAccuracy,
      BookmakerInformedness,
      FowlkesMallowsIndex,
      Markedness,
      MatthewsCorrelationCoefficient,
      PrevalenceThreshold,
      ThreatScore,
    ];
    const matrix: ConfusionMatrix = {
      truePositives: IntersectionCache.get(
        [groundTruthExperimentId, predictedExperimentId],
        [],
        [datasetId]
      ).numberPairs,
      falsePositives: IntersectionCache.get(
        [predictedExperimentId],
        [groundTruthExperimentId],
        [datasetId]
      ).numberPairs,
      falseNegatives: IntersectionCache.get(
        [groundTruthExperimentId],
        [predictedExperimentId],
        [datasetId]
      ).numberPairs,
      trueNegatives: IntersectionCache.get(
        [],
        [groundTruthExperimentId, predictedExperimentId],
        [datasetId]
      ).numberPairs,
    };
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
  ): Intersection {
    return IntersectionCache.get(
      experiments
        .filter(({ predictedCondition }) => predictedCondition)
        .map(({ experimentId }) => experimentId),
      experiments
        .filter(({ predictedCondition }) => !predictedCondition)
        .map(({ experimentId }) => experimentId),
      [
        datasetFromExperimentIds(
          experiments.map(({ experimentId }) => experimentId)
        ).id,
      ]
    );
  }
}
