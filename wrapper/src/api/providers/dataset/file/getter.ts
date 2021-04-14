import { Table, tables } from '../../../database';
import {
  datasetCustomColumnPrefix,
  tableSchemas,
} from '../../../database/schemas';
import { DatasetId, FileResponse } from '../../../server/types';

type DatasetSchema = ReturnType<typeof tableSchemas['dataset']['dataset']>;

export class DatasetFileGetter {
  protected table: Table<DatasetSchema>;
  protected customColumns: string[];
  protected sortedColumn: string;
  constructor(
    readonly id: DatasetId,
    private readonly startAt?: number,
    private readonly limit?: number,
    sortBy?: string
  ) {
    this.table = tables.dataset.dataset(id);
    this.customColumns = Object.values(this.table.schema.columns)
      .map((column) => column.name)
      .filter((column) => column.startsWith(datasetCustomColumnPrefix))
      .sort();
    this.sortedColumn = this.getSortedColumn(sortBy);
  }

  get(): FileResponse {
    return {
      header: this.customColumns.map((column) =>
        column.substring(datasetCustomColumnPrefix.length)
      ),
      data: this.table.all(
        {},
        {
          returnedColumns: this.customColumns,
          raw: true,
          limit: this.limit,
          startAt: this.startAt,
          sortBy: [this.sortedColumn],
        }
      ) as string[][],
    };
  }

  private getSortedColumn(sortBy?: string): string {
    let sortedColumn: string;
    if (sortBy) {
      sortedColumn = datasetCustomColumnPrefix + sortBy;
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
