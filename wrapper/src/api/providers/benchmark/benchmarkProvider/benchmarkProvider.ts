import {
  ExperimentId,
  ExperimentIntersection,
  ExperimentIntersectionCount,
  ExperimentIntersectionPairCountsItem,
  ExperimentIntersectionPairCountsRequestExperiments,
  ExperimentIntersectionRequestExperiments,
} from '../../../server/types';
import { Metric } from '../../../server/types';
import { numberOfPairs } from '../../../tools/numberOfPairs';
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
      numberPairs: intersection.pairCount,
      numberRows: intersection.rowCount,
    };
  }

  calculateExperimentIntersectionPairCounts(
    config: ExperimentIntersectionPairCountsRequestExperiments[]
  ): ExperimentIntersectionPairCountsItem[] {
    const dataset = datasetFromExperimentIds(
      config.map(({ experimentId }) => experimentId)
    );
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
          state === ExperimentState.INCLUDED ? index : undefined
        )
        .filter((index) => index !== undefined) as ExperimentId[];
      const excluded = state
        .map((state, index) =>
          state === ExperimentState.EXCLUDED ? index : undefined
        )
        .filter((index) => index !== undefined) as ExperimentId[];
      let pairCount: number;
      if (included.length === 0) {
        pairCount = numberOfPairs(dataset.numberOfRecords);
        if (excluded.length !== 0) {
          pairCount -= IntersectionCache.get(excluded, []).pairCount;
        }
      } else {
        pairCount = IntersectionCache.get(included, excluded).pairCount;
      }
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
        pairCount,
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
  }): ExperimentIntersection {
    const intersection = this.intersection(config);
    return idClustersToRecordClusters(
      intersection.clusters(startAt, limit),
      datasetFromExperimentIds(config.map(({ experimentId }) => experimentId))
        .id
    );
  }

  getBinaryMetrics(goldstandardId: number, experimentId: number): Metric[] {
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
      truePositives: IntersectionCache.get([goldstandardId, experimentId], [])
        .pairCount,
      falsePositives: IntersectionCache.get([experimentId], [goldstandardId])
        .pairCount,
      falseNegatives: IntersectionCache.get([goldstandardId], [experimentId])
        .pairCount,
      trueNegatives: 0,
    };
    matrix.trueNegatives =
      numberOfPairs(
        datasetFromExperimentIds([goldstandardId, experimentId]).numberOfRecords
      ) -
      matrix.truePositives -
      matrix.falsePositives -
      matrix.falseNegatives;
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
        .map(({ experimentId }) => experimentId)
    );
  }
}
