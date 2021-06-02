import { CSVInserter } from '../csvInserter';

export class Sigmod2021ExperimentInserter extends CSVInserter {
  protected readonly separator: string = ',';
  protected readonly quote: string = '"';
  protected readonly escape: string = '"';
  protected readonly requiredColumns: string[] = [
    'left_instance_id',
    'right_instance_id',
  ];

  protected addRow(row: {
    left_instance_id?: string;
    right_instance_id?: string;
    label?: string;
  }): void {
    const similarityScores = Object.fromEntries(
      Object.entries(row)
        .filter(
          ([key, _]) =>
            !['left_instance_id', 'right_instance_id', 'label'].includes(key)
        )
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(([key, value]) => [key, parseFloat(value!)])
    );
    this.addDuplicate(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.left_instance_id!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.right_instance_id!,
      row.label !== '0',
      similarityScores
    );
  }
}
