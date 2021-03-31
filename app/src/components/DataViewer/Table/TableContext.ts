import { createContext } from 'react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

export const TableContext = createContext<{
  prepareRow: (row: Row<string[]>) => void;
  rows: Row<string[]>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<string[]> | undefined
  ) => TableBodyProps;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  prepareRow: () => {},
  getTableBodyProps: () => ({}),
  rows: [],
});
