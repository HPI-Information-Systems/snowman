import { assertType } from '../../../tools/types';
import { escapeColumnNames } from '../../tools/escapeColumnNames';
import { Column, Columns, Schemas } from '../../tools/types';

export const experimentCustomColumnPrefix = 'experiment_';
export const experimentSchemas = assertType<
  Schemas<'experiment', ['experiment']>
>()({
  experiment: {
    experiment: (experimentId: number, similarityScores: Column[] = []) => {
      const knownColumns = assertType<Columns>()({
        id1: {
          name: 'id1' as const,
          dataType: 'INTEGER',
          notNull: true,
          primaryKey: true,
        },
        id2: {
          name: 'id2' as const,
          dataType: 'INTEGER',
          notNull: true,
          primaryKey: true,
        },
        isDuplicate: {
          name: 'isDuplicate' as const,
          dataType: 'INTEGER',
          notNull: true,
        },
      });
      const columns = {
        ...knownColumns,
        ...escapeColumnNames(similarityScores, experimentCustomColumnPrefix),
      } as Columns & typeof knownColumns;
      return {
        schema: 'experiment',
        name: `experiment${experimentId}`,
        columns,
        indices: [
          ...Object.values(columns).map((column) => [column]),
          [columns.id1, columns.id2],
        ],
      };
    },
  },
});
