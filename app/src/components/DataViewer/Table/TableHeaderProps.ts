import { ColumnInstance, HeaderGroup } from 'react-table';

export type TableHeaderProps = {
  headerGroups: HeaderGroup<string[]>[];
  visibleColumns: ColumnInstance<string[]>[];
  setColumnOrder: (
    updater: string[] | ((columnOrder: string[]) => string[])
  ) => void;
};
