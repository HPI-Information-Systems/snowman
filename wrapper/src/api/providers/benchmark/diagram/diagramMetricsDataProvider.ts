import { DiagramExperimentItem, MetricsEnum } from '../../../server/types';
import { ConfusionMatrixCache } from '../cache/flavors/confusionMatrixCache';
import { datasetFromExperimentIds } from '../datasetFromExperiments';
import { metricsMap } from '../metrics/allMetrics';
import { DiagramDataProvider } from './diagramDataProvider';

export class DiagramMetricsDataProvider extends DiagramDataProvider {
  getData(
    metric: MetricsEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const datasetId = datasetFromExperimentIds([
      diagramExperimentItem.groundTruth.experimentId,
      diagramExperimentItem.experiment.experimentId,
    ]).id;

    const matrix = ConfusionMatrixCache.get({
      datasetId,
      predicted: [diagramExperimentItem.experiment],
      groundTruth: [diagramExperimentItem.groundTruth],
    }).confusionMatrix;

    const mappedMetric = metricsMap.get(metric.toString());
    if (!mappedMetric) throw new Error(`The metric ${metric} does not exist!`);
    return new mappedMetric(matrix).value;
  }
}
