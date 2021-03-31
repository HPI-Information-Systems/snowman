import { assertType } from '../../tools/types';
import { ForeignKeys, Schemas } from '../tools/types';

export const metaSchemas = assertType<
  Schemas<'meta', ['algorithm', 'dataset', 'experiment']>
>()({
  meta: {
    algorithm: {
      name: 'algorithm',
      schema: 'meta',
      autoInstall: true,
      columns: {
        id: {
          name: 'id' as const,
          dataType: 'INTEGER',
          notNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          name: 'name' as const,
          dataType: 'TEXT',
          notNull: true,
        },
        description: {
          name: 'description' as const,
          dataType: 'TEXT',
        },
        implementationKnowHowLevel: {
          name: 'implementationKnowHowLevel' as const,
          dataType: 'TEXT',
        },
        matchingSolutionType: {
          name: 'matchingSolutionType' as const,
          dataType: 'TEXT',
        },
        timeToInstall: {
          name: 'timeToInstall' as const,
          dataType: 'INTEGER',
        },
        useCase: {
          name: 'useCase' as const,
          dataType: 'TEXT',
        },
        inputFormat: {
          name: 'inputFormat' as const,
          dataType: 'TEXT',
        },
        interface: {
          name: 'interface' as const,
          dataType: 'TEXT',
        },
        costs: {
          name: 'costs' as const,
          dataType: 'INTEGER',
        },
        os: {
          name: 'os' as const,
          dataType: 'TEXT',
        },
      },
    },
    dataset: {
      name: 'dataset',
      schema: 'meta',
      autoInstall: true,
      columns: {
        id: {
          name: 'id' as const,
          dataType: 'INTEGER',
          notNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          name: 'name' as const,
          dataType: 'TEXT',
          notNull: true,
        },
        tags: {
          name: 'tags' as const,
          dataType: 'TEXT',
        },
        description: {
          name: 'description' as const,
          dataType: 'TEXT',
        },
        numberOfRecords: {
          name: 'numberOfRecords' as const,
          dataType: 'INTEGER',
        },
        numberOfUploadedRecords: {
          name: 'numberOfUploadedRecords' as const,
          dataType: 'INTEGER',
        },
      },
    },
    experiment: {
      name: 'experiment',
      schema: 'meta',
      autoInstall: true,
      columns: {
        id: {
          name: 'id' as const,
          dataType: 'INTEGER',
          notNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          name: 'name' as const,
          dataType: 'TEXT',
          notNull: true,
        },
        algorithm: {
          name: 'algorithm' as const,
          dataType: 'INTEGER',
          notNull: true,
          foreignKeys: (): ForeignKeys => {
            return [
              {
                table: metaSchemas.meta.algorithm,
                column: metaSchemas.meta.algorithm.columns.id,
              },
            ];
          },
        },
        dataset: {
          name: 'dataset' as const,
          dataType: 'INTEGER',
          notNull: true,
          foreignKeys: (): ForeignKeys => {
            return [
              {
                table: metaSchemas.meta.dataset,
                column: metaSchemas.meta.dataset.columns.id,
              },
            ];
          },
        },
        description: {
          name: 'description' as const,
          dataType: 'TEXT',
        },
        numberOfUploadedRecords: {
          name: 'numberOfUploadedRecords' as const,
          dataType: 'INTEGER',
        },
        timeToConfigure: {
          name: 'timeToConfigure' as const,
          dataType: 'INTEGER',
        },
        implementationKnowHowLevel: {
          name: 'implementationKnowHowLevel' as const,
          dataType: 'TEXT',
        },
      },
    },
  },
});
