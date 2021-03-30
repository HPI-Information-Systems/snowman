import parse from 'csv-parse';
import { Readable } from 'stream';

import { logger } from './logger';

export type CSVColumn = string;
export type CSVRow = { [column in CSVColumn]: string };
export type CSVReadResult = {
  insertedRowCount: number;
  skippedRowCount: number;
};

/**
 * The general flow of functions (without error) is:
 * 1. readColumns
 * 2. readRow for all rows
 * 3. finish
 */
export interface CSVReaderStrategy {
  readColumns(columns: Set<CSVColumn>): void;
  readRow(row: CSVRow): void;
  /**
   * Is called if
   * 1. an error occured in @function readColumns
   * 2. an error occured in @function finish
   * 3. an error occured in @function readRow and @member CSVReader.config.skipLinesWithErrors is false
   * No other functions are called after this.
   */
  onError?(error: Error): void;
  finish?(): void;
}

export class CSVReader {
  private insertedRowCount = 0;
  private skippedRowCount = 0;
  private columns = new Set<CSVColumn>();

  private reject?: (error: Error) => void;
  private startedReading = false;
  private errorOccured = false;
  private emittedColumns = false;

  constructor(
    private readonly file: Readable,
    private readonly strategy: CSVReaderStrategy,
    private readonly config: {
      readonly quote: string;
      readonly escape: string;
      readonly separator: string;
      readonly skipLinesWithErrors: boolean;
    }
  ) {}

  async read(): Promise<CSVReadResult> {
    this.throwIfAlreadyRead();
    return new Promise((resolve, reject) => {
      this.reject = reject;
      this.file
        .pipe(
          parse({
            quote: this.config.quote,
            escape: this.config.escape,
            delimiter: this.config.separator,
            bom: true,
            columns: (columns: CSVColumn[]) =>
              columns.map((column) => this.addColumn(column)),
            skip_empty_lines: true,
            skip_lines_with_error: true,
          } as parse.Options)
        )
        .on('data', (row) => this.readRow(row))
        .on('skip', (error) => {
          if (this.config.skipLinesWithErrors) {
            logger.error(error.message, error);
            this.skippedRowCount++;
          } else {
            this.emitError(error);
          }
        })
        .on('end', () => this.finish(resolve))
        .on('error', (error) => this.emitError(error));
    });
  }

  private throwIfAlreadyRead() {
    if (this.startedReading) {
      throw new Error('The file has already been read.');
    } else {
      this.startedReading = true;
    }
  }

  private emitError(error: Error, informParser = true) {
    if (!this.errorOccured) {
      this.errorOccured = true;
      // we cannot close the streams as this would yield in strange behaviour of express (the response would not be sent correctly)
      if (informParser && this.strategy.onError) {
        try {
          this.strategy.onError(error);
        } finally {
          this.reject && this.reject(error);
        }
      } else {
        this.reject && this.reject(error);
      }
    }
  }

  private emitColumnsIfNecessary() {
    if (!this.emittedColumns && !this.errorOccured) {
      this.emittedColumns = true;
      try {
        this.strategy.readColumns(this.columns);
      } catch (error) {
        this.emitError(error);
      }
    }
  }

  private addColumn(column: CSVColumn): CSVColumn {
    if (this.columns.has(column)) {
      this.emitError(
        new Error(
          `The csv file is invalid as it contains a duplicate column: ${column}`
        ),
        false
      );
    } else {
      this.columns.add(column);
    }
    return column;
  }

  private readRow(row: CSVRow) {
    this.emitColumnsIfNecessary();
    if (!this.errorOccured) {
      try {
        this.strategy.readRow(row);
        this.insertedRowCount++;
      } catch (error) {
        if (this.config.skipLinesWithErrors) {
          logger.error(error.message, error);
          this.skippedRowCount++;
        } else {
          this.emitError(error);
        }
      }
    }
  }

  private finish(resolve: (result: CSVReadResult) => void) {
    this.emitColumnsIfNecessary();
    if (!this.errorOccured) {
      try {
        if (this.strategy.finish) {
          this.strategy.finish();
        }
        resolve({
          insertedRowCount: this.insertedRowCount,
          skippedRowCount: this.skippedRowCount,
        });
      } catch (error) {
        this.emitError(error);
      }
    }
  }
}
