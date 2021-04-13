import { assertType } from '../../tools/types';
import { Columns, Schemas } from '../tools/types';

const columns = assertType<Columns>()({
  key: {
    name: 'key',
    notNull: true,
    dataType: 'TEXT',
  },
  value: {
    name: 'value',
    notNull: true,
    dataType: 'INTEGER',
  },
});

export const cacheSchemas = assertType<
  Schemas<'cache', ['intersectionCounts']>
>()({
  cache: {
    intersectionCounts: {
      name: 'intersectionCounts',
      schema: 'cache',
      autoInstall: true,
      columns,
      indices: [[columns.key]],
    },
  },
});
