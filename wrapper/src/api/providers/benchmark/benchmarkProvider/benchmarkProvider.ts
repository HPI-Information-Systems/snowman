import {
  ExperimentId,
  ExperimentIntersectionCount,
  ExperimentIntersectionPairCountsItem,
  ExperimentIntersectionPairCountsRequestExperiments,
  ExperimentIntersectionRequestExperiments,
  FileResponse,
} from '../../../server/types';
import { Metric } from '../../../server/types';
import { datasetFromExperimentIds } from './datasetFromExperiments';
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

export class BenchmarkProvider {
  calculateExperimentIntersectionCount({
    config,
  }: {
    config: ExperimentIntersectionRequestExperiments[];
  }): ExperimentIntersectionCount {
    const intersection = this.intersection(config);
    return {
      numberPairs: intersection.numberPairs,
      numberRows: intersection.rowCount,
    };
  }

  calculateExperimentIntersectionPairCounts(
    config: ExperimentIntersectionPairCountsRequestExperiments[]
  ): ExperimentIntersectionPairCountsItem[] {
    const experimentIds = config.map(({ experimentId }) => experimentId);
    const datasetId = datasetFromExperimentIds(experimentIds).id;
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
    const state = config.map(() => ExperimentState.IRRELEVANT);
    const counts: ExperimentIntersectionPairCountsItem[] = [];
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
          state === ExperimentState.INCLUDED ? experimentIds[index] : undefined
        )
        .filter((index) => index !== undefined) as ExperimentId[];
      const excluded = state
        .map((state, index) =>
          state === ExperimentState.EXCLUDED ? experimentIds[index] : undefined
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
    config,
    startAt,
    limit,
    sortBy,
  }: {
    config: ExperimentIntersectionRequestExperiments[];
    startAt?: number;
    limit?: number;
    sortBy?: string;
  }): FileResponse {
    const intersection = this.intersection(config);
    return idClustersToRecordClusters(
      intersection.clusters(startAt, limit),
      datasetFromExperimentIds(config.map(({ experimentId }) => experimentId))
        .id
    );
  }

  getBinaryMetrics(goldstandardId: number, experimentId: number): Metric[] {
    const datasetId = datasetFromExperimentIds([goldstandardId, experimentId])
      .id;
    const metrics = [
      Accuracy,
      Precision,
      Recall,
      F1Score,

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
        [goldstandardId, experimentId],
        [],
        [datasetId]
      ).numberPairs,
      falsePositives: IntersectionCache.get(
        [experimentId],
        [goldstandardId],
        [datasetId]
      ).numberPairs,
      falseNegatives: IntersectionCache.get(
        [goldstandardId],
        [experimentId],
        [datasetId]
      ).numberPairs,
      trueNegatives: IntersectionCache.get(
        [],
        [goldstandardId, experimentId],
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
    config: ExperimentIntersectionRequestExperiments[]
  ): Intersection {
    return IntersectionCache.get(
      config
        .filter(({ predictedCondition }) => predictedCondition)
        .map(({ experimentId }) => experimentId),
      config
        .filter(({ predictedCondition }) => !predictedCondition)
        .map(({ experimentId }) => experimentId),
      [
        datasetFromExperimentIds(config.map(({ experimentId }) => experimentId))
          .id,
      ]
    );
  }
}
