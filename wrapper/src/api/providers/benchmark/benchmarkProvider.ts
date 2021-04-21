import {
  ExperimentConfigItem,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
  FileResponse,
} from '../../server/types';
import { Metric } from '../../server/types';
import { ConfusionMatrixCache } from './cache/flavors/confusionMatrixCache';
import { IntersectionCache } from './cache/flavors/intersectionCache';
import { datasetFromExperimentIds } from './datasetFromExperiments';
import { idClustersToRecordClusters } from './idsToRecords';
import { IntersectionBase } from './intersection/intersectionBase';
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
