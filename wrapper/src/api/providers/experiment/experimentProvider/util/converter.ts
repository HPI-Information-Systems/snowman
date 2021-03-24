import { tableSchemas } from '../../../../database/schemas';
import { ColumnValues } from '../../../../database/tools/types';
import { Experiment } from '../../../../server/types';

type StoredExperiment = ColumnValues<
  typeof tableSchemas['meta']['experiment']['columns']
>;

export class ExperimentConverter {
  apiExperimentToStoredExperiment(apiExperiment: Experiment): StoredExperiment {
    return {
      algorithm: apiExperiment.algorithmId,
      dataset: apiExperiment.datasetId,
      description: apiExperiment.description ?? null,
      name: apiExperiment.name,
      id: apiExperiment.id,
      numberOfUploadedRecords: apiExperiment.numberOfUploadedRecords ?? null,
      timeToConfigure: apiExperiment.softKPIs?.timeToConfigure ?? null,
    };
  }

  storedExperimentToApiExperiment(
    storedExperiment: StoredExperiment
  ): Experiment {
    return {
      algorithmId: storedExperiment.algorithm,
      datasetId: storedExperiment.dataset,
      description: storedExperiment.description ?? undefined,
      id: storedExperiment.id,
      name: storedExperiment.name,
      numberOfUploadedRecords:
        storedExperiment.numberOfUploadedRecords ?? undefined,
      softKPIs: {
        timeToConfigure: storedExperiment.timeToConfigure ?? undefined,
      },
    };
  }
}
