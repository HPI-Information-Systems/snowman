import { tables } from '../../../database';
import {
  AlgorithmId,
  Dataset,
  DatasetId,
  ExperimentId,
} from '../../../server/types';
import { ExecuteSynchronized } from '../../../tools/executeSynchronized';
import { providers } from '../..';

export class ExperimentConsistencyChecks {
  readonly sync = new ExecuteSynchronized();

  throwIfAlgorithmNotExists(algorithmId: AlgorithmId): void {
    providers.algorithm.getAlgorithm(algorithmId);
  }

  throwIfDatasetHasNoRecordCount(dataset: Dataset): void {
    if (typeof dataset.numberOfRecords !== 'number') {
      throw new Error(
        `The connected dataset ${dataset.name} (${dataset.id}) must specify the number of records (by uploading a dataset or setting it manually).`
      );
    }
  }

  throwIfDatasetNotExists(datasetId: DatasetId): void {
    providers.dataset.getDataset(datasetId);
  }

  throwIfExperimentNotExists(experimentId: ExperimentId): void {
    providers.experiment.getExperiment(experimentId);
  }

  throwIfExperimentFileAlreadyExists(experimentId: ExperimentId): void {
    if (tables.experiment.experiment(experimentId).exists()) {
      throw new Error(
        `An experiment file for the experiment with the id ${experimentId} already exists. It is not possible to edit an uploaded experiment file. Please create a new experiment if you want to upload this file.`
      );
    }
  }

  throwIfLocked(experimentId: ExperimentId): void {
    if (this.sync.isLocked(experimentId)) {
      throw new Error(
        `The experiment with the id ${experimentId} is currently edited by somebody else. Please try again later. (If this error occurs while deleting a dataset, then the experiment with the id ${experimentId} references this dataset.)`
      );
    }
  }
}
