import { tables } from '../../../../database';
import { AlgorithmId, DatasetId, ExperimentId } from '../../../../server/types';
import { ExecuteSynchronized } from '../../../../tools/executeSynchronized';
import { getProviders } from '../../..';

export class ExperimentConsistencyChecks {
  readonly sync = new ExecuteSynchronized();

  throwIfAlgorithmNotExists(algorithmId: AlgorithmId): void {
    getProviders().algorithm.getAlgorithm(algorithmId);
  }

  throwIfDatasetNotExists(datasetId: DatasetId): void {
    getProviders().dataset.getDataset(datasetId);
  }

  throwIfExperimentNotExists(experimentId: ExperimentId): void {
    getProviders().experiment.getExperiment(experimentId);
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
