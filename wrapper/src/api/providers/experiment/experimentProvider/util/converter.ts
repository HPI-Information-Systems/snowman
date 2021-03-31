import { tableSchemas } from '../../../../database/schemas';
import { ColumnValues } from '../../../../database/tools/types';
import {
  Experiment,
  ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum,
} from '../../../../server/types';

type StoredExperiment = ColumnValues<
  typeof tableSchemas['meta']['experiment']['columns']
>;

export class ExperimentConverter {
  apiExperimentToStoredExperiment(apiExperiment: Experiment): StoredExperiment {
    return {
      id: apiExperiment.id,
      name: apiExperiment.name,
      description: apiExperiment.description ?? null,
      algorithm: apiExperiment.algorithmId,
      dataset: apiExperiment.datasetId,
      numberOfUploadedRecords: apiExperiment.numberOfUploadedRecords ?? null,
      timeToConfigure: apiExperiment.softKPIs?.timeToConfigure ?? null,
      implementationKnowHowLevel:
        apiExperiment.softKPIs?.implementationKnowHowLevel ?? null,
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
        implementationKnowHowLevel:
          (storedExperiment.implementationKnowHowLevel as ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum | null) ??
          undefined,
      },
    };
  }
}
