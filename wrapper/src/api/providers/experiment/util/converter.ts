import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Experiment, Metric } from '../../../server/types';
import { calculateEffort } from '../../algorithm/util/effortPoints/calculateEffort';

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
      hrAmount: apiExperiment.softKPIs?.effort?.hrAmount ?? null,
      expertise: apiExperiment.softKPIs?.effort?.expertise ?? null,
      runtime: apiExperiment.softKPIs?.runtime ?? null,
    };
  }

  storedExperimentToApiExperiment(
    storedExperiment: StoredExperiment
  ): Experiment {
    let effort: Metric[] | undefined;
    if (storedExperiment.expertise && storedExperiment.hrAmount) {
      effort = calculateEffort(
        storedExperiment.expertise,
        storedExperiment.hrAmount
      );
    }
    return {
      algorithmId: storedExperiment.algorithm,
      datasetId: storedExperiment.dataset,
      description: storedExperiment.description ?? undefined,
      effort: effort,
      id: storedExperiment.id,
      name: storedExperiment.name,
      numberOfUploadedRecords:
        storedExperiment.numberOfUploadedRecords ?? undefined,
      softKPIs: {
        effort: {
          hrAmount: storedExperiment.hrAmount ?? undefined,
          expertise: storedExperiment.expertise ?? undefined,
        },
        runtime: storedExperiment.runtime ?? undefined,
      },
    };
  }
}
