import { MutableRefObject } from 'react';
import { Column, ColumnInstance, HeaderGroup } from 'react-table';
import { IndexRange } from 'react-virtualized';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export type TableProps = {
  columns: string[];
  rows: string[][];
  onRowsRendered: (params: IndexRange) => void;
  rowsChanged: unknown;
  columnsChanged: unknown;
  openDataViewerWindow: () => SnowmanThunkAction<void, unknown>;
};

export type TableContentProps = {
  columns: Column<string[]>[];
  data: string[][];
  onRowsRendered: (params: IndexRange) => void;
  width: number;
  resetTable: MutableRefObject<boolean>;
  openDataViewerWindow: () => SnowmanThunkAction<void, unknown>;
};

export type TableBodyProps = {
  onRowsRendered: (params: IndexRange) => void;
};

export type TableHeaderOwnProps = {
  headerGroups: HeaderGroup<string[]>[];
  visibleColumns: ColumnInstance<string[]>[];
  setColumnOrder: (
    updater: string[] | ((columnOrder: string[]) => string[])
  ) => void;
  openDataViewerWindow: () => SnowmanThunkAction<void, unknown>;
};

export type TableHeaderDispatchProps = {
  performOpenDataViewerWindow: () => void;
};

export type TableHeaderProps = TableHeaderOwnProps & TableHeaderDispatchProps;
