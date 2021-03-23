import {
  ExperimentId,
  ExperimentIntersectionCount,
  ExperimentIntersectionPairCountsItem,
  ExperimentIntersectionPairCountsRequestExperiments,
  ExperimentIntersectionRequestExperiments,
  FileResponse,
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
      numberPairs: intersection.numberPairs,
      numberRows: intersection.rowCount,
    };
  }

  calculateExperimentIntersectionPairCounts(
    config: ExperimentIntersectionPairCountsRequestExperiments[]
  ): ExperimentIntersectionPairCountsItem[] {
    const experimentIds = config.map(({ experimentId }) => experimentId);
    const dataset = datasetFromExperimentIds(experimentIds);
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
      let numberPairs: number;
      let numberRows: number;
      if (included.length === 0) {
        numberPairs = numberOfPairs(dataset.numberOfRecords);
        if (excluded.length !== 0) {
          numberPairs -= IntersectionCache.get(excluded, []).numberPairs;
        }
        numberRows = numberPairs * 2 + Math.max(0, numberPairs - 1);
      } else {
        numberPairs = IntersectionCache.get(included, excluded).numberPairs;
        numberRows = IntersectionCache.get(included, excluded).rowCount;
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
        numberPairs,
        numberRows,
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
        .numberPairs,
      falsePositives: IntersectionCache.get([experimentId], [goldstandardId])
        .numberPairs,
      falseNegatives: IntersectionCache.get([goldstandardId], [experimentId])
        .numberPairs,
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
