import 'components/DataViewer/Table/TableContentStyles.css';

import ScrollSyncContainer from 'components/DataViewer/Table/ScrollSync/ScrollSyncContainer';
import TableBody from 'components/DataViewer/Table/TableBody';
import { TableContext } from 'components/DataViewer/Table/TableContext';
import TableHeader from 'components/DataViewer/Table/TableHeader';
import { TableContentProps } from 'components/DataViewer/Table/TableProps';
import React, { useMemo } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
  useTable,
} from 'react-table';
import { scrollbarWidth } from 'utils/scrollbarWidth';

export default function TableContent({
  columns: rawColumns,
  data,
  onRowsRendered,
  width,
  resetTable,
}: TableContentProps): JSX.Element {
  const columns = useMemo<Column<string[]>[]>(
    () => new Proxy(rawColumns, {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rawColumns, width]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        width: (width - scrollbarWidth()) / columns.length,
        minWidth: 50,
      },
      autoResetPage: resetTable.current,
      autoResetExpanded: resetTable.current,
      autoResetGroupBy: resetTable.current,
      autoResetSelectedRows: resetTable.current,
      autoResetSortBy: resetTable.current,
      autoResetFilters: resetTable.current,
      autoResetRowState: resetTable.current,
      autoResetGlobalFilter: resetTable.current,
      autoResetHiddenColumns: resetTable.current,
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <ScrollSyncContainer scrollWidth={totalColumnsWidth + scrollbarWidth()}>
      <TableContext.Provider
        value={{
          prepareRow,
          rows,
          headerGroups,
          getTableBodyProps,
        }}
      >
        <div {...getTableProps()} className="table-root">
          <TableHeader />
          <TableBody onRowsRendered={onRowsRendered} />
        </div>
      </TableContext.Provider>
    </ScrollSyncContainer>
  );
}
