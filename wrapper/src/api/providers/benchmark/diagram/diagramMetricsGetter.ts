import { DiagramExperimentItem, MetricsEnum } from '../../../server/types';
import { BenchmarkProvider } from '../benchmarkProvider';
import { DiagramDataGetter } from './diagramGetter';

export class DiagramMetricsGetter extends DiagramDataGetter {
  getData(
    metric: MetricsEnum,
    diagramExperimentItem: DiagramExperimentItem
  ): number {
    const benchmarkProvider = new BenchmarkProvider();
    console.log(diagramExperimentItem.groundTruth.experimentId);
    console.log(diagramExperimentItem.experiment.experimentId);
    const metrics = benchmarkProvider.getBinaryMetrics(
      diagramExperimentItem.groundTruth,
      diagramExperimentItem.experiment
    );
    return (
      metrics.find(
        (returnedMetric) => (returnedMetric.name as MetricsEnum) === metric
      )?.value ?? -1
    );
  }
}
