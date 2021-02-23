import { Writeable } from '../../tools/types';
import { Column } from './types';

export function escapeColumnName(
  columnName: string,
  addPrefix: string
): string {
  return (addPrefix + columnName).replace(/[^a-zA-Z0-9 _-]/gi, '');
}

export function escapeColumnNames(
  columns: Column[],
  addPrefix = ''
): { [column: string]: Column } {
  return Object.fromEntries(
    columns.map((column) => {
      (column as Writeable<Column>).name = escapeColumnName(
        column.name,
        addPrefix
      );
      return [column.name, column];
    })
  );
}
