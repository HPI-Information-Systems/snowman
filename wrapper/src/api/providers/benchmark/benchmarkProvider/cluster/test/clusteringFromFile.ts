import { CSVReader, CSVRow } from '../../../../../tools/csvReader';
import { readFile } from '../../../../../tools/readFile';
import { Clustering } from '../types';
import { UnionFind } from '../unionFind';

export async function clusteringFromPilotExperiment(
  path: string,
  numberNodes: number
): Promise<Clustering> {
  const clustering = new UnionFind(numberNodes);
  await new CSVReader(
    readFile(path),
    {
      readColumns() {
        return;
      },
      readRow(row: CSVRow) {
        clustering.link([[parseInt(row.p1), parseInt(row.p2)]]);
      },
    },
    {
      quote: '"',
      escape: "'",
      separator: ',',
      skipLinesWithErrors: false,
    }
  ).read();
  return clustering;
}
