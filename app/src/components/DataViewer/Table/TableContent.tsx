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
  columns,
  data,
  onRowsRendered,
  height,
  width,
}: TableContentProps): JSX.Element {
  const defaultColumn = useMemo<Partial<Column<string[]>>>(
    () => ({
      width: width / columns.length,
    }),
    [columns, width]
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
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );
  const scrollWidth = useMemo(() => totalColumnsWidth + scrollbarWidth(), [
    totalColumnsWidth,
  ]);

  return (
    <ScrollSyncContainer scrollWidth={scrollWidth}>
      <TableContext.Provider
        value={{
          prepareRow,
          rows,
          headerGroups,
          getTableBodyProps,
        }}
      >
        <div
          {...getTableProps()}
          className="table"
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <TableHeader />
          <TableBody onRowsRendered={onRowsRendered} />
        </div>
      </TableContext.Provider>
    </ScrollSyncContainer>
  );
}
