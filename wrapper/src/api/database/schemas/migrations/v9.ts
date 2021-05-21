import { providers } from '../../../providers';
import {
  ExperimentId,
  SimilarityThresholdFunctionDefinitionTypeEnum,
} from '../../../server/types';
import { SetupOptions } from '../../setup';
import { tables } from '../../tables';
import { isSimilarityColumn, removeExperimentCustomColumnPrefix } from '..';
import { SchemaVersion } from './schemaVersion';
import { SchemaV8 } from './v8';

export class SchemaV9 extends SchemaVersion {
  readonly predecessor = new SchemaV8();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    providers.experiment
      .listExperiments()
      .forEach(({ id }) => this.addSimilarityFunctionsForEachColumn(id));
  }

  private addSimilarityFunctionsForEachColumn(id: ExperimentId): void {
    const similarityColumnNames = Object.values(
      tables.experiment.experiment(id).schema.columns
    )
      .filter(({ name }) => isSimilarityColumn(name))
      .map(({ name }) => removeExperimentCustomColumnPrefix(name));

    similarityColumnNames.forEach((similarityColumnName: string) => {
      providers.similarityThresholds.addSimilarityThresholdFunction({
        similarityThresholdFunction: {
          name: similarityColumnName,
          experimentId: id,
          definition: {
            type:
              SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
            similarityThreshold: similarityColumnName,
          },
        },
      });
    });
  }
}
