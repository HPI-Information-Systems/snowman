import ScrollSyncContainer from 'components/DataViewer/Table/ScrollSync/ScrollSyncContainer';
import { TableContext } from 'components/DataViewer/Table/TableContext';
import TableHeader, {
  tableHeaderHeight,
} from 'components/DataViewer/Table/TableHeader';
import { TableContentProps } from 'components/DataViewer/Table/TableProps';
import TableRow from 'components/DataViewer/Table/TableRow';
import React, { useMemo } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
  useTable,
} from 'react-table';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList } from 'react-window';
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

  // Render the UI for your table
  return (
    <ScrollSyncContainer scrollWidth={scrollWidth}>
      <TableContext.Provider
        value={{
          prepareRow,
          rows,
          headerGroups,
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
          <div
            {...getTableBodyProps()}
            style={{
              position: 'relative',
              height: `calc(${height}px - ${tableHeaderHeight})`,
            }}
          >
            <AutoSizer>
              {({ height }) => (
                <FixedSizeList
                  onItemsRendered={(props) =>
                    onRowsRendered({
                      startIndex: props.visibleStartIndex,
                      stopIndex: props.visibleStopIndex,
                    })
                  }
                  height={height}
                  itemCount={rows.length}
                  itemSize={35}
                  width={width}
                  style={{
                    overflowX: 'hidden',
                  }}
                >
                  {TableRow}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        </div>
      </TableContext.Provider>
    </ScrollSyncContainer>
  );
}
