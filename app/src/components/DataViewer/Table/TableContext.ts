import { createContext } from 'react';
import { HeaderGroup, Row } from 'react-table';

export const TableContext = createContext<{
  prepareRow: (row: Row<string[]>) => void;
  rows: Row<string[]>[];
  headerGroups: HeaderGroup<string[]>[];
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  prepareRow: () => {},
  rows: [],
  headerGroups: [],
});
