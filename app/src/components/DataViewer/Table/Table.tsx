import TableContent from 'components/DataViewer/Table/TableContent';
import { TableProps } from 'components/DataViewer/Table/TableProps';
import React, { useMemo } from 'react';
import { AutoSizer } from 'react-virtualized';

export default function Table({
  columns,
  rows,
  onRowsRendered,
  change,
}: TableProps): JSX.Element {
  const memoizedColumns = useMemo(
    () =>
      columns.map((column, index) => ({
        Header: column,
        accessor: (row: string[]) => row[index],
      })),
    [columns]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRows = useMemo(() => new Proxy(rows, {}), [rows, change]);

  return (
    <AutoSizer>
      {(size) => (
        <div
          style={{
            width: size.width,
            height: size.height,
            position: 'relative',
          }}
        >
          <TableContent
            data={memoizedRows}
            columns={memoizedColumns}
            onRowsRendered={onRowsRendered}
            {...size}
          ></TableContent>
        </div>
      )}
    </AutoSizer>
  );
}
