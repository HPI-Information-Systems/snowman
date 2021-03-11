import { Readable } from 'stream';

import { INSERT_BATCH_SIZE } from '../../../../config';
import { Table } from '../../../../database';
import {
  datasetCustomColumnPrefix,
  tableSchemas,
} from '../../../../database/schemas';
import { InsertParameters } from '../../../../database/table/inserter';
import { escapeColumnName } from '../../../../database/tools/escapeColumnNames';
import { Column } from '../../../../database/tools/types';
import { DatasetId } from '../../../../server/types';
import {
  CSVColumn,
  CSVReader,
  CSVReaderStrategy,
  CSVReadResult,
  CSVRow,
} from '../../../../tools/csvReader';
import { DatasetIDMapper } from '../util/idMapper';

type DatasetFileSchema = ReturnType<typeof tableSchemas['dataset']['dataset']>;

export class DatasetInserter implements CSVReaderStrategy {
  private table?: Table<DatasetFileSchema>;

  constructor(
    private readonly datasetId: DatasetId,
    private readonly idMapper: DatasetIDMapper,
    private readonly fileIdColumn: string
  ) {}

  async insert(
    file: Readable,
    quote: string,
    escape: string,
    separator: string
  ): Promise<CSVReadResult> {
    return new CSVReader(file, this, {
      quote,
      escape,
      separator,
      skipLinesWithErrors: true,
    }).read();
  }

  async readColumns(columns: Set<CSVColumn>): Promise<void> {
    if (!columns.has(this.fileIdColumn)) {
      throw new Error(
        `The file does not contain the column ${this.fileIdColumn} (specified as id column).`
      );
    } else {
      this.table = new Table(this.getTableSchema([...columns]));
      this.table.create(true, false);
    }
  }

  private getTableSchema(columns: string[]): DatasetFileSchema {
    return tableSchemas.dataset.dataset(
      this.datasetId,
      columns.map((column) => {
        return {
          name: column,
          dataType: 'TEXT',
          notNull: column === this.fileIdColumn,
        };
      })
    );
  }

  async readRow(row: CSVRow): Promise<void> {
    if (this.table) {
      const columns = this.table.schema.columns;
      this.table.batchInsert(
        () => [this.rowToInsertParameters(columns, row)],
        INSERT_BATCH_SIZE
      );
    }
  }

  private rowToInsertParameters(
    columns: DatasetFileSchema['columns'],
    row: CSVRow
  ): InsertParameters<DatasetFileSchema>[number] {
    return [
      ...Object.entries(row).map(([header, value]) => {
        return {
          column: columns[
            escapeColumnName(header, datasetCustomColumnPrefix)
          ] as Column<'TEXT'>,
          value,
        };
      }),
      {
        column: columns.id,
        value: this.idMapper.map(row[this.fileIdColumn]),
      },
    ];
  }

  async finish(): Promise<void> {
    this.table && this.table.flushBatchInsert();
    this.table && this.table.createIndices(true);
  }
}
