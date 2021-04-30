import { TableContext } from 'components/simple/DataViewer/Table/TableContext';
import { tableHeaderHeight } from 'components/simple/DataViewer/Table/TableHeader.View';
import { TableBodyProps } from 'components/simple/DataViewer/Table/TableProps';
import TableRow from 'components/simple/DataViewer/Table/TableRow';
import React, { useContext } from 'react';
import { AutoSizer } from 'react-virtualized';
import { FixedSizeList } from 'react-window';

export default function TableBody({
  onRowsRendered,
}: TableBodyProps): JSX.Element {
  const { getTableBodyProps, rows } = useContext(TableContext);
  return (
    <div
      {...getTableBodyProps()}
      style={{
        position: 'relative',
        height: `calc(100% - ${tableHeaderHeight})`,
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            onItemsRendered={(props) =>
              onRowsRendered({
                startIndex: props.visibleStartIndex,
                stopIndex: props.visibleStopIndex,
              })
            }
            height={height}
            itemCount={rows.length}
            itemSize={40}
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
  );
}
