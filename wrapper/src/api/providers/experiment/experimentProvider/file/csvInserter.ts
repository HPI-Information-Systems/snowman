import { Readable } from 'stream';

import {
  CSVColumn,
  CSVReader,
  CSVReaderStrategy,
  CSVRow,
} from '../../../../tools/csvReader';
import { ExperimentInserter } from './experimentInserter';

export abstract class CSVInserter
  extends ExperimentInserter
  implements CSVReaderStrategy {
  protected abstract readonly separator: string;
  protected abstract readonly quote: string;
  protected abstract readonly escape: string;

  protected abstract readonly requiredColumns: string[];
  protected readonly removedColumns?: Set<string>;
  protected abstract addRow(row: CSVRow): void;

  async insert_internal(file: Readable): Promise<void> {
    await new CSVReader(file, this, {
      escape: this.escape,
      quote: this.quote,
      separator: this.separator,
      skipLinesWithErrors: false,
    }).read();
  }

  async readColumns(columns: Set<CSVColumn>): Promise<void> {
    const unseenRequiredColumns = new Set(this.requiredColumns);
    for (const column of columns) {
      unseenRequiredColumns.delete(column);
    }
    if (unseenRequiredColumns.size > 0) {
      throw new Error(
        `The uploaded experiment is invalid as it does not contain the required columns ${[
          ...unseenRequiredColumns.values(),
        ].join(
          ', '
        )}. Make sure you have selected the correct experiment file format.`
      );
    }
  }

  async readRow(row: CSVRow): Promise<void> {
    if (this.removedColumns) {
      for (const column of this.removedColumns) {
        delete row[column];
      }
    }
    this.addRow(row);
  }
}
