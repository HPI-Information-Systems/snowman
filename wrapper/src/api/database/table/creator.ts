import { databaseBackend } from '../setup/backend';
import type { Column, TableSchema } from '../tools/types';
import type { Table } from './table';

export class TableCreator<Schema extends TableSchema> {
  constructor(private readonly table: Table<Schema>) {}

  createTable(raiseIfExists = false, createIndices = true): void {
    databaseBackend().exec(this.createTableQuery(raiseIfExists));
    if (createIndices) {
      this.createIndices(raiseIfExists);
    }
  }

  createIndices(raiseIfExists = false): void {
    for (const createIndexQuery of this.createIndexQueries(raiseIfExists)) {
      databaseBackend().exec(createIndexQuery);
    }
  }

  private createIndexQueries(raiseIfExists: boolean): string[] {
    return (this.table.schema.indices ?? []).map((index) =>
      this.createIndexQuery(index, raiseIfExists)
    );
  }

  private createIndexQuery(index: Column[], raiseIfExists: boolean): string {
    return `
    CREATE INDEX${raiseIfExists ? '' : ' IF NOT EXISTS'} "${
      this.table.schema.schema
    }"."index_${this.table.schema.name}_${index
      .map((column) => column.name)
      .join('-')}" ON "${this.table.schema.name}" ("${index
      .map((column) => column.name)
      .join('","')}")
`;
  }

  private createTableQuery(raiseIfExists: boolean) {
    return `
            ${this.createTableStatement(raiseIfExists)} (
                ${this.columns()}
                ${this.constraints()}
            )
        `;
  }

  private createTableStatement(raiseIfExists: boolean) {
    return `CREATE TABLE ${raiseIfExists ? '' : 'IF NOT EXISTS '}${this.table}`;
  }

  private columns() {
    return Object.values(this.table.schema.columns)
      .map(
        (column) =>
          `"${column.name}" ${column.dataType}${this.columnConstraints(column)}`
      )
      .join(',');
  }

  private columnConstraints(column: Column) {
    return (
      (column.notNull ? ' NOT NULL' : '') +
      (column.autoIncrement ? ' PRIMARY KEY AUTOINCREMENT' : '')
    );
  }

  private constraints() {
    return [
      '',
      ...this.primaryKeyConstraints(),
      ...this.foreignKeyConstraints(),
    ].join(',');
  }

  private primaryKeyConstraints() {
    const columns = Object.values(this.table.schema.columns);
    const primaryKeyColumns = columns.filter((column) => column.primaryKey);
    const autoIncrementColumns = columns.filter(
      (column) => column.autoIncrement
    );
    if (autoIncrementColumns.length > 0) {
      if (autoIncrementColumns.length > 1) {
        throw new Error(
          `The maximum number of autoincrement columns is 1. The table ${this.table} has ${autoIncrementColumns.length} auto incremented columns.`
        );
      } else if (
        primaryKeyColumns.length !== 1 ||
        primaryKeyColumns[0] !== autoIncrementColumns[0]
      ) {
        throw new Error(
          `If a column is autoincremented, the table must have exactly one primary key column being the autoincremented column. The table ${this.table} does not satisfy this constraint.`
        );
      }
      return [];
    } else {
      const primaryKeys = primaryKeyColumns
        .map((column) => column.name)
        .join(',');
      return primaryKeys.length > 0 ? [`PRIMARY KEY(${primaryKeys})`] : [];
    }
  }

  private foreignKeyConstraints() {
    return Object.values(this.table.schema.columns)
      .filter((column) => column.foreignKeys)
      .map((column) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        column.foreignKeys!().map(
          (foreignKey) =>
            `FOREIGN KEY ("${column.name}") REFERENCES ${foreignKey.table.name}("${foreignKey.column.name}")`
        )
      )
      .flat();
  }
}
