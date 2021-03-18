import parse from 'csv-parse';
import { Readable } from 'stream';

import { ExecuteSynchronized } from './executeSynchronized';
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
  readColumns(columns: Set<CSVColumn>): Promise<void>;
  readRow(row: CSVRow): Promise<void>;
  /**
   * Is called if
   * 1. an error occured in @function readColumns
   * 2. an error occured in @function finish
   * 3. an error occured in @function readRow and @member CSVReader.config.skipLinesWithErrors is false
   * No other functions are called after this.
   */
  onError?(error: Error): Promise<void>;
  finish?(): Promise<void>;
}

export class CSVReader {
  private insertedRowCount = 0;
  private skippedRowCount = 0;
  private columns = new Set<CSVColumn>();

  private reject?: (error: Error) => void;
  private parsedStream?: Readable;
  private startedReading = false;
  private errorOccured = false;
  private emittedColumns = false;

  private readonly sync = new ExecuteSynchronized();

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
      this.parsedStream = this.file
        .pipe(
          parse({
            quote: this.config.quote,
            escape: this.config.escape,
            delimiter: this.config.separator,
            bom: true,
            columns: (columns: CSVColumn[]) =>
              columns.map((column) => this.addColumn(column)),
            skip_empty_lines: true,
            skip_lines_with_error: this.config.skipLinesWithErrors,
          } as parse.Options)
        )
        .on('data', (row) => this.sync.call(() => this.readRow(row)))
        .on('skip', (error) => {
          logger.error(error.message, error);
          this.skippedRowCount++;
        })
        .on('end', () => this.sync.call(() => this.finish(resolve)))
        .on('error', (error) => this.sync.call(() => this.emitError(error)));
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
      this.closeParsedStream();
      this.closeFile();
      if (informParser && this.strategy.onError) {
        this.strategy
          .onError(error)
          .catch((_) => _)
          .then(() => this.reject && this.reject(error));
      } else {
        this.reject && this.reject(error);
      }
    }
  }

  private closeParsedStream() {
    if (
      this.parsedStream &&
      !this.parsedStream.readableEnded &&
      !this.parsedStream.destroyed
    ) {
      this.parsedStream.unpipe();
      this.parsedStream.destroy();
    }
  }

  private closeFile() {
    if (!this.file.readableEnded && !this.file.destroyed) {
      this.file.unpipe();
      this.file.destroy();
    }
  }

  private async emitColumnsIfNecessary() {
    if (!this.emittedColumns && !this.errorOccured) {
      this.emittedColumns = true;
      try {
        await this.strategy.readColumns(this.columns);
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

  private async readRow(row: CSVRow) {
    await this.emitColumnsIfNecessary();
    if (!this.errorOccured) {
      try {
        await this.strategy.readRow(row);
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

  private async finish(resolve: (result: CSVReadResult) => void) {
    await this.emitColumnsIfNecessary();
    if (!this.errorOccured) {
      try {
        if (this.strategy.finish) {
          await this.strategy.finish();
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
