import { assertType } from '../../tools/types';
import { escapeColumnNames } from '../tools/escapeColumnNames';
import { Column, Columns, Schemas } from '../tools/types';

export const datasetCustomColumnPrefix = 'dataset_';
export const datasetSchemas = assertType<
  Schemas<'dataset', ['dataset', 'datasetIdMap']>
>()({
  dataset: {
    dataset: (datasetId: number, customColumns: Column[] = []) => {
      const knownColumns = assertType<Columns>()({
        id: {
          name: 'id' as const,
          dataType: 'INTEGER',
          notNull: true,
          primaryKey: true,
        },
      });
      const columns = {
        ...knownColumns,
        ...escapeColumnNames(customColumns, datasetCustomColumnPrefix),
      } as Columns & typeof knownColumns;
      return {
        schema: 'dataset',
        name: `dataset_${datasetId}` as const,
        columns,
        indices: Object.values(columns).map((column) => [column]),
      };
    },
    datasetIdMap: (datasetId: number) => {
      const columns = assertType<Columns>()({
        id: {
          name: 'id' as const,
          dataType: 'INTEGER',
          notNull: true,
          primaryKey: true,
        },
        unmappedId: {
          name: 'unmappedId' as const,
          dataType: 'TEXT',
          notNull: true,
        },
      });
      return {
        schema: 'dataset',
        name: `datasetIdMap_${datasetId}`,
        columns,
        indices: Object.values(columns).map((column) => [column]),
      };
    },
  },
});
