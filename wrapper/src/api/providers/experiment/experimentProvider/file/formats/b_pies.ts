import { Readable } from 'stream';

import { CSVInserter } from '../csvInserter';

type B_PIESRow = {
  Partner?: string;
  Customer?: string;
  Relevance?: string;
};

const B_PIES_MIN_MATCH_PERCENT = 90;

export class B_PIESExperimentInserter extends CSVInserter {
  protected readonly separator: string = ';';
  protected readonly quote: string = '"';
  protected readonly escape: string = '\\';
  protected readonly requiredColumns: string[] = [
    'Partner',
    'Customer',
    'Relevance',
  ];

  protected lastClusterHeader?: B_PIESRow;
  protected lastClusterRows: B_PIESRow[] = [];

  protected processLastCluster(): void {
    if (this.lastClusterHeader && this.lastClusterRows.length >= 1) {
      const rows = this.lastClusterRows.filter((row) => row['Customer']);
      for (const row of rows) {
        const relevance = parseFloat(
          (row['Relevance'] ?? '0').replace(',', '.')
        );
        this.addDuplicate(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `external${parseInt(this.lastClusterHeader!['Partner']!)}`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `customer${parseInt(row['Customer']!)}`,
          relevance >= B_PIES_MIN_MATCH_PERCENT,
          { relevance }
        );
      }
      this.lastClusterRows.length = 0;
    }
  }

  protected addRow(row: B_PIESRow): void {
    if (!row['Customer']) {
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
