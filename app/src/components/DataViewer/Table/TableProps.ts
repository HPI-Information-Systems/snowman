import { MutableRefObject } from 'react';
import { Column } from 'react-table';
import { IndexRange } from 'react-virtualized';

export type TableProps = {
  columns: string[];
  rows: string[][];
  onRowsRendered: (params: IndexRange) => void;
  rowsChanged: unknown;
  columnsChanged: unknown;
};

export type TableContentProps = {
  columns: Column<string[]>[];
  data: string[][];
  onRowsRendered: (params: IndexRange) => void;
  width: number;
  resetTable: MutableRefObject<boolean>;
};

export type TableBodyProps = {
  onRowsRendered: (params: IndexRange) => void;
};
