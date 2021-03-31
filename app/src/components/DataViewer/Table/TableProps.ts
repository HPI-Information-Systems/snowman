import { Column, Row } from 'react-table';
import { IndexRange } from 'react-virtualized';

export type TableProps = {
  columns: string[];
  rows: string[][];
  onRowsRendered: (params: IndexRange) => void;
  change: unknown;
};

export type TableContentProps = {
  columns: Column<string[]>[];
  data: string[][];
  onRowsRendered: (params: IndexRange) => void;
  width: number;
  height: number;
};

export type TableBodyProps = {
  onRowsRendered: (params: IndexRange) => void;
};
