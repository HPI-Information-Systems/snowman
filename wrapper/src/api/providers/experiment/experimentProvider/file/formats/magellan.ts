import { CSVInserter } from '../csvInserter';

export class MagellanExperimentInserter extends CSVInserter {
  protected readonly separator: string = ',';
  protected readonly quote: string = '"';
  protected readonly escape: string = "'";

  protected readonly requiredColumns: string[] = [
    'ltable_id',
    'rtable_id',
    'predicted',
  ];
  protected readonly removedColumns = new Set(['', '_id', 'gold']);

  protected addRow(pair: { [name: string]: string }): void {
    const id1 = pair['ltable_id'] as string;
    const id2 = pair['rtable_id'] as string;
    if (id1 !== id2) {
      const isDuplicate = (pair['predicted'] as string) === '1';

      const similarityScores = Object.fromEntries(
        Object.entries(pair)
          .filter(([key, _]) => !this.requiredColumns.includes(key))
          .map(([key, value]) => [key, parseFloat(value)])
      );

      this.addDuplicate(id1, id2, isDuplicate, similarityScores);
    }
  }
}
