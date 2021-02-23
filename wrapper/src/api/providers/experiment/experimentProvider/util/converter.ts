import { Experiment, ExperimentValues } from '../../../../server/types';

export interface StoredExperimentValues {
  name: string;
  description: string | null;
  datasetId: number;
  algorithmId: number;
}

export interface StoredExperiment extends StoredExperimentValues {
  id: number;
  numberOfUploadedRecords: number | null;
}

export class ExperimentConverter {
  apiExperimentValuesToStoredExperimentValues(
    apiExperiment: ExperimentValues
  ): StoredExperimentValues {
    return {
      algorithmId: apiExperiment.algorithmId,
      datasetId: apiExperiment.datasetId,
      description: apiExperiment.description ?? null,
      name: apiExperiment.name,
    };
  }

  apiExperimentToStoredExperiment(apiExperiment: Experiment): StoredExperiment {
    return {
      ...this.apiExperimentValuesToStoredExperimentValues(apiExperiment),
      id: apiExperiment.id,
      numberOfUploadedRecords: apiExperiment.numberOfUploadedRecords ?? null,
    };
  }

  storedExperimentToApiExperiment(
    storedExperiment: StoredExperiment
  ): Experiment {
    return {
      algorithmId: storedExperiment.algorithmId,
      datasetId: storedExperiment.datasetId,
      description: storedExperiment.description ?? undefined,
      id: storedExperiment.id,
      name: storedExperiment.name,
      numberOfUploadedRecords:
        storedExperiment.numberOfUploadedRecords ?? undefined,
    };
  }
}
