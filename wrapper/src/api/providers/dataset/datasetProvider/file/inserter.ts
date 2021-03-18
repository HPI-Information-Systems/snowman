import { Readable } from 'stream';

import { INSERT_BATCH_SIZE } from '../../../../config';
import { Table, tables } from '../../../../database';
import {
  datasetCustomColumnPrefix,
  tableSchemas,
} from '../../../../database/schemas';
import { escapeColumnName } from '../../../../database/tools/escapeColumnNames';
import { NullableColumnValues } from '../../../../database/tools/types';
import { DatasetId } from '../../../../server/types';
import {
  CSVColumn,
  CSVReader,
  CSVReaderStrategy,
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
  ): Promise<number> {
    return await new CSVReader(file, this, {
      quote,
      escape,
      separator,
      skipLinesWithErrors: false,
    })
      .read()
      .then(({ insertedRowCount }) => insertedRowCount);
  }

  async readColumns(columns: Set<CSVColumn>): Promise<void> {
    if (!columns.has(this.fileIdColumn)) {
      throw new Error(
        `The file does not contain the column ${this.fileIdColumn} (specified as id column).`
      );
    } else {
      this.table = tables.dataset.dataset(
        this.datasetId,
        [...columns].map((column) => {
          return {
            name: column,
            dataType: 'TEXT',
            notNull: column === this.fileIdColumn,
          };
        })
      );
      this.table.create(true, false);
    }
  }
  async readRow(row: CSVRow): Promise<void> {
    if (this.table) {
      this.table.batchUpsert(
        [() => this.rowToInsertParameters(row)],
        INSERT_BATCH_SIZE
      );
    }
  }

  private rowToInsertParameters(
    row: CSVRow
  ): NullableColumnValues<DatasetFileSchema['columns']> {
    return {
      ...Object.fromEntries(
        Object.entries(row).map(([header, value]) => [
          escapeColumnName(header, datasetCustomColumnPrefix),
          value,
        ])
      ),
      id: this.idMapper.map(row[this.fileIdColumn]),
    };
  }

  async finish(): Promise<void> {
    this.table && this.table.flushBatchUpsert();
    this.table && this.table.createIndices(true);
  }
}
