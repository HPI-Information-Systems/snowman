import { Dataset, ExperimentId } from '../../../server/types';
import { getProviders } from '../..';

export function datasetFromExperimentIds(
  experimentIds: ExperimentId[]
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
