import { tables } from '../../../database';
import { tableSchemas } from '../../../database/schemas';
import { ExperimentId } from '../../../server/types';
import { ExperimentFileGetter } from './getter';

type ExperimentSchema = ReturnType<
  typeof tableSchemas['experiment']['experiment']
>;

export function rawGetter(
  experiment: ExperimentId
): ExperimentFileGetter<ExperimentSchema> {
  const table = tables.experiment.experiment(experiment);
  return new ExperimentFileGetter(
    {
      filter: {},
      filterType: '=',
      table,
      idColumns: [table.schema.columns.id1, table.schema.columns.id2],
    },
    experiment
  );
}
