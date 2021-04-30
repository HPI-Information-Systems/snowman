import { tables } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import {
  ExperimentConfigItemSimilarity,
  ExperimentId,
} from '../../../server/types';
import { ExperimentFileGetter } from './getter';

type SimilaritySchema = ReturnType<
  typeof tableSchemas['experiment']['similarityThresholdFunction']
>;

export function similarityGetter(
  experiment: ExperimentId,
  { func, threshold }: ExperimentConfigItemSimilarity
): ExperimentFileGetter<SimilaritySchema> {
  const table = tables.experiment.similarityThresholdFunction(experiment, func);
  return new ExperimentFileGetter(
    {
      filters: [['similarity', '>=', threshold]],
      table,
      idColumns: [table.schema.columns.id1, table.schema.columns.id2],
    },
    experiment
  );
}
