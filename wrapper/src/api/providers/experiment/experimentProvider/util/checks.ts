import { AlgorithmId, DatasetId, ExperimentId } from '../../../../server/types';
import { ExecuteSynchronized } from '../../../../tools/executeSynchronized';
import { providers } from '../../..';

export class ExperimentConsistencyChecks {
  readonly sync = new ExecuteSynchronized();

  throwIfDatasetNotExists(datasetId: DatasetId): void {
    providers.dataset.getDataset(datasetId);
  }

  throwIfAlgorithmNotExists(algorithmId: AlgorithmId): void {
    providers.algorithm.getAlgorithm(algorithmId);
  }

  throwIfExperimentNotExists(experimentId: ExperimentId): void {
    providers.experiment.getExperiment(experimentId);
  }

  throwIfLocked(experimentId: ExperimentId): void {
    if (this.sync.isLocked(experimentId)) {
      throw new Error(
        `The experiment with the id ${experimentId} is currently edited by somebody else. Please try again later. (If this error occurs while deleting a dataset, then the experiment with the id ${experimentId} references this dataset.)`
      );
    }
  }
}
