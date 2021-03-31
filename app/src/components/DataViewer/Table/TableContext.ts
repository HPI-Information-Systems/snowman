import { createContext } from 'react';
import {
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
} from 'react-table';

export const TableContext = createContext<{
  prepareRow: (row: Row<string[]>) => void;
  rows: Row<string[]>[];
  headerGroups: HeaderGroup<string[]>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<string[]> | undefined
  ) => TableBodyProps;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  prepareRow: () => {},
  getTableBodyProps: () => ({}),
  rows: [],
  headerGroups: [],
});
