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
    this.addDuplicate(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.left_instance_id!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      row.right_instance_id!,
      row.label ? row.label !== '0' : true
    );
  }
}
