import {
  Dataset,
  ExperimentId,
  ExperimentIntersection,
} from '../../../server/types';
import { Metric } from '../../../server/types';
import { getProviders } from '../..';
import { BaseBenchmarkProvider } from '../baseBenchmarkProvider';
import { EvaluatorCache } from './helper/evaluator';
import { ConfusionTupleMode } from './helper/evaluator/confusionMatrix/modes';
import { idClustersToRecordClusters } from './helper/idsToRecords';
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

export class BenchmarkProvider extends BaseBenchmarkProvider {
  protected readonly evaluatorCache = new EvaluatorCache();

  getConfusionTuples(
    goldstandardId: number,
    experimentId: number,
    goldStandardDuplicates: boolean,
    experimentDuplicates: boolean,
    mode: ConfusionTupleMode = ConfusionTupleMode.PAIRS
  ): ExperimentIntersection {
    const dataset = this.getDatasetByExperimentIds(
      goldstandardId,
      experimentId
    );
    const tuples = this.evaluatorCache
      .evaluate(goldstandardId, experimentId, dataset.numberOfRecords)
      .confusionMatrixTuples(mode);

    let idClusters: number[][];
    if (goldStandardDuplicates && experimentDuplicates) {
      idClusters = tuples.truePositives;
    } else if (goldStandardDuplicates && !experimentDuplicates) {
      idClusters = tuples.falseNegatives;
    } else if (!goldStandardDuplicates && experimentDuplicates) {
      idClusters = tuples.falsePositives;
    } else {
      throw new Error(
        'Please notice that getting the true negative records is not supported!'
      );
    }
    return idClustersToRecordClusters(idClusters, dataset.id);
  }

  calculateMetrics(goldstandardId: number, experimentId: number): Metric[] {
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

    const dataset = this.getDatasetByExperimentIds(
      goldstandardId,
      experimentId
    );
    const matrix = this.evaluatorCache.evaluate(
      goldstandardId,
      experimentId,
      dataset.numberOfRecords
    ).confusionMatrixCounts;
    return metrics
      .map((Metric) => new Metric(matrix))
      .map(({ value, name, description, range }) => {
        return {
          value,
          name,
          description,
          range,
        };
      });
  }

  protected getDatasetByExperimentIds(
    ...experimentIds: ExperimentId[]
  ): Dataset & { numberOfRecords: number } {
    const datasetProvider = getProviders().dataset;
    const experimentProvider = getProviders().experiment;
    const datasetIds = experimentIds.map(
      (experimentId) => experimentProvider.getExperiment(experimentId).datasetId
    );
    const dataset = datasetProvider.getDataset(datasetIds[0]);

    if (!datasetIds.every((datasetId) => datasetId === dataset.id)) {
      throw new Error('The given experiments belong to different datasets.');
    }
    if (dataset.numberOfRecords === undefined) {
      throw new Error('The dataset does not specify a number of records.');
    }
    return dataset as Dataset & { numberOfRecords: number };
  }
}
