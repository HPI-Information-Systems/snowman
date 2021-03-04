import { Readable } from 'stream';

import { CSVInserter } from '../csvInserter';

type BHANARow = {
  'External ID'?: string;
  Customer?: string;
  'Fuzzy Match Percent'?: string;
};

const BHANA_MIN_MATCH_PERCENT = 90;

export class BHANAExperimentInserter extends CSVInserter {
  protected readonly separator: string = ';';
  protected readonly quote: string = '"';
  protected readonly escape: string = '\\';
  protected readonly requiredColumns: string[] = [
    'External ID',
    'Customer',
    'Fuzzy Match Percent',
  ];

  protected lastClusterHeader?: BHANARow;
  protected lastClusterRows: BHANARow[] = [];

  protected processLastCluster(): void {
    if (this.lastClusterHeader && this.lastClusterRows.length >= 1) {
      const rows = this.lastClusterRows.filter((row) => row['Customer']);
      for (const row of rows) {
        const fuzzyMatchPercent = parseFloat(
          (row['Fuzzy Match Percent'] ?? '0').replace(',', '.')
        );
        this.addDuplicate(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `external${parseInt(this.lastClusterHeader['External ID']!)}`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `customer${parseInt(row['Customer']!)}`,
          fuzzyMatchPercent >= BHANA_MIN_MATCH_PERCENT,
          { fuzzyMatchPercent }
        );
      }
      this.lastClusterRows.length = 0;
    }
  }

  protected addRow(row: BHANARow): void {
    if (row['External ID']) {
      this.processLastCluster();
      this.lastClusterHeader = row;
    } else {
      this.lastClusterRows.push(row);
    }
  }
  async insert_internal(file: Readable): Promise<void> {
    await super.insert_internal(file);
    this.processLastCluster();
  }
}
