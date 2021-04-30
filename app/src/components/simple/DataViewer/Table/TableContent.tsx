import 'components/simple/DataVieweraViewer/Table/TableContentStyles.css';

import ScrollSyncContainer from 'components/simple/DataViewer/Table/ScrollSync/ScrollSyncContainer';
import TableBody from 'components/simple/DataViewer/Table/TableBody';
import { TableContext } from 'components/simple/DataViewer/Table/TableContext';
import TableHeader from 'components/simple/DataViewer/Table/TableHeader';
import { TableContentProps } from 'components/simple/DataViewer/Table/TableProps';
import React, { useMemo } from 'react';
import {
  Column,
  useBlockLayout,
  useColumnOrder,
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
  openDataViewerWindow,
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
    setColumnOrder,
    visibleColumns,
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
    useResizeColumns,
    useColumnOrder
  );

  return (
    <ScrollSyncContainer scrollWidth={totalColumnsWidth + scrollbarWidth()}>
      <TableContext.Provider
        value={{
          prepareRow,
          rows,
          getTableBodyProps,
        }}
      >
        <div {...getTableProps()} className="table-root">
          <TableHeader
            headerGroups={headerGroups}
            visibleColumns={visibleColumns}
            setColumnOrder={setColumnOrder}
            openDataViewerWindow={openDataViewerWindow}
          />
          <TableBody onRowsRendered={onRowsRendered} />
        </div>
      </TableContext.Provider>
    </ScrollSyncContainer>
  );
}
