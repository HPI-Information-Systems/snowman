import { databaseBackend, Table } from '../../../../database';
import { latest } from '../../../../database/schemas';
import { loadTableFromDatabase } from '../../../../database/table/loader';
import { DatasetId } from '../../../../server/types';

type DatasetSchema = ReturnType<
  typeof latest.tableSchemas['dataset']['dataset']
>;

export class DatasetFileGetter {
  protected table: Table<DatasetSchema>;
  protected customColumns: string[];
  protected sortedColumn: string;
  constructor(
    private readonly id: DatasetId,
    private readonly startAt?: number,
    private readonly limit?: number,
    sortBy?: string
  ) {
    this.table = loadTableFromDatabase<DatasetSchema>(
      latest.tableSchemas.dataset.dataset(id)
    );
    this.customColumns = Object.values(this.table.schema.columns)
      .map((column) => column.name)
      .filter((column) => column.startsWith(latest.datasetCustomColumnPrefix));
    this.sortedColumn = this.getSortedColumn(sortBy);
  }

  *iterate(): IterableIterator<string[]> {
    yield this.customColumns.map((column) =>
      column.substring(latest.datasetCustomColumnPrefix.length)
    );
    yield* databaseBackend()
      .prepare(
        `
            SELECT ${this.getColumnsString()}
              FROM ${this.table}
          ORDER BY "${this.sortedColumn}"
             ${
               this.limit !== undefined && this.startAt !== undefined
                 ? 'LIMIT @limit OFFSET @startAt'
                 : this.limit !== undefined
                 ? 'LIMIT @limit'
                 : this.startAt !== undefined
                 ? 'LIMIT -1 OFFSET @startAt'
                 : ''
             }
      `
      )
      .raw(true)
      .iterate({ startAt: this.startAt, limit: this.limit });
  }

  private getColumnsString(): string {
    return this.customColumns.map((column) => `"${column}"`).join(',');
  }

  private getSortedColumn(sortBy?: string): string {
    let sortedColumn: string;
    if (sortBy) {
      sortedColumn = latest.datasetCustomColumnPrefix + sortBy;
      if (!this.customColumns.includes(sortedColumn)) {
        throw new Error(
          'Cannot sort by ' + sortBy + ' as this column does not exist.'
        );
      }
    } else {
      sortedColumn = this.table.schema.columns.id.name;
    }
    return sortedColumn;
  }
}
