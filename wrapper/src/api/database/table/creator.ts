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
      (column.autoIncrement && !column.primaryKey ? ' AUTOINCREMENT' : '')
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
    const primaryKeys = Object.values(this.table.schema.columns)
      .filter((column) => column.primaryKey)
      .map((column) => column.name)
      .join(',');
    return primaryKeys.length > 0 ? [`PRIMARY KEY(${primaryKeys})`] : [];
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
