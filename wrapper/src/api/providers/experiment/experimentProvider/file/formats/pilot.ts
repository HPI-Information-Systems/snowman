import { CSVInserter } from '../csvInserter';

export class PilotExperimentInserter extends CSVInserter {
  protected readonly separator: string = ',';
  protected readonly quote: string = '"';
  protected readonly escape: string = "'";
  protected readonly requiredColumns: string[] = ['p1', 'p2'];

  protected addRow(row: {
    p1?: string;
    p2?: string;
    prediction?: string;
    [similarityScore: string]: string | undefined;
  }): void {
    const similarityScores = Object.fromEntries(
      Object.entries(row)
        .filter(([key, _]) => !['p1', 'p2', 'prediction'].includes(key))
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(([key, value]) => [key, parseFloat(value!)])
    );
    this.addDuplicate(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.p1!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.p2!,
      row.prediction !== '0',
      similarityScores
    );
  }
}
