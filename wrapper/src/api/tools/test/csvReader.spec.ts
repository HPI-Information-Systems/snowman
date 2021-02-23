import { Readable } from 'stream';

import { CSVReader, CSVRow } from '../csvReader';

describe('CSVReader', () => {
  test('double quote char escaped', async () => {
    let columns: Set<string> | undefined = undefined;
    const rows: CSVRow[] = [];
    await new CSVReader(
      Readable.from(['c1,c2\n', '"v""1","v2"']),
      {
        readColumns: async (_columns) => {
          columns = _columns;
        },
        readRow: async (row) => {
          rows.push(row);
        },
      },
      {
        escape: '"',
        quote: '"',
        separator: ',',
        skipLinesWithErrors: false,
      }
    ).read();
    expect(columns).toEqual(new Set(['c1', 'c2']));
    expect(rows).toEqual([{ c1: 'v"1', c2: 'v2' }]);
  });
});
