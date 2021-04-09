import {
  ExperimentConfigItem,
  ExperimentId,
  ExperimentIntersectionCount,
  ExperimentIntersectionItem,
  FileResponse,
  SimilarityThresholdFunctionId,
} from '../../server/types';
import { Metric } from '../../server/types';
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
      numberRows: intersection.rowCount,
    };
  }

  protected idsAndSimilarity(
    targetState: ExperimentState,
    experiments: ExperimentConfigItem[],
    state: ExperimentState[]
  ): [
    ExperimentConfigItem[],
    ExperimentId[],
    (number | undefined)[],
    (SimilarityThresholdFunctionId | undefined)[]
  ] {
    const targetExperiments = state
      .map((state, index) =>
        state === targetState ? experiments[index] : undefined
      )
      .filter((index) => index !== undefined) as ExperimentConfigItem[];
    const targetIds = targetExperiments.map(({ experimentId }) => experimentId);
    const targetThresholds = targetExperiments.map(
      ({ similarity }) => similarity?.threshold
    );
    const targetFunctions = targetExperiments.map(
      ({ similarity }) => similarity?.func
    );
    return [targetExperiments, targetIds, targetThresholds, targetFunctions];
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
      const [
        included,
        includedIds,
        includedThresholds,
        includedFunctions,
      ] = this.idsAndSimilarity(ExperimentState.INCLUDED, experiments, state);
      const [
        excluded,
        excludedIds,
        excludedThresholds,
        excludedFunctions,
      ] = this.idsAndSimilarity(ExperimentState.EXCLUDED, experiments, state);

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
        numberPairs: IntersectionCache.get(
          includedIds,
          excludedIds,
          [datasetId],
          includedThresholds,
          includedFunctions,
          excludedThresholds,
          excludedFunctions
        ).numberPairs,
        numberRows: IntersectionCache.get(
          includedIds,
          excludedIds,
          [datasetId],
          includedThresholds,
          includedFunctions,
          excludedThresholds,
          excludedFunctions
        ).rowCount,
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
    const matrix: ConfusionMatrix = {
      truePositives: IntersectionCache.get(
        [groundTruthExperiment.experimentId, predictedExperiment.experimentId],
        [],
        [datasetId],
        [
          groundTruthExperiment.similarity?.threshold,
          predictedExperiment.similarity?.threshold,
        ],
        [
          groundTruthExperiment.similarity?.func,
          predictedExperiment.similarity?.func,
        ],
        [],
        []
      ).numberPairs,
      falsePositives: IntersectionCache.get(
        [predictedExperiment.experimentId],
        [groundTruthExperiment.experimentId],
        [datasetId],
        [predictedExperiment.similarity?.threshold],
        [predictedExperiment.similarity?.func],
        [groundTruthExperiment.similarity?.threshold],
        [groundTruthExperiment.similarity?.func]
      ).numberPairs,
      falseNegatives: IntersectionCache.get(
        [groundTruthExperiment.experimentId],
        [predictedExperiment.experimentId],
        [datasetId],
        [groundTruthExperiment.similarity?.threshold],
        [groundTruthExperiment.similarity?.func],
        [predictedExperiment.similarity?.threshold],
        [predictedExperiment.similarity?.func]
      ).numberPairs,
      trueNegatives: IntersectionCache.get(
        [],
        [groundTruthExperiment.experimentId, predictedExperiment.experimentId],
        [datasetId],
        [],
        [],
        [
          groundTruthExperiment.similarity?.threshold,
          predictedExperiment.similarity?.threshold,
        ],
        [
          groundTruthExperiment.similarity?.func,
          predictedExperiment.similarity?.func,
        ]
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
    const included = experiments.filter(
      ({ predictedCondition }) => predictedCondition
    );
    const excluded = experiments.filter(
      ({ predictedCondition }) => !predictedCondition
    );
    return IntersectionCache.get(
      included.map(({ experimentId }) => experimentId),
      excluded.map(({ experimentId }) => experimentId),
      [
        datasetFromExperimentIds(
          experiments.map(({ experimentId }) => experimentId)
        ).id,
      ],
      included.map(({ similarity }) => similarity?.threshold),
      included.map(({ similarity }) => similarity?.func),
      excluded.map(({ similarity }) => similarity?.threshold),
      excluded.map(({ similarity }) => similarity?.func)
    );
  }
}
