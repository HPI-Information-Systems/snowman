import TableContent from 'components/DataViewer/Table/TableContent';
import { TableProps } from 'components/DataViewer/Table/TableProps';
import React, { useMemo, useRef } from 'react';
import { AutoSizer } from 'react-virtualized';

export default function Table({
  columns,
  rows,
  onRowsRendered,
  rowsChanged,
  columnsChanged,
}: TableProps): JSX.Element {
  const resetTable = useRef(true);
  const memoizedRows = useMemo(() => {
    resetTable.current = false;
    return new Proxy(rows, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, rowsChanged]);
  const memoizedColumns = useMemo(
    () => {
      resetTable.current = true;
      return columns.map((column, index) => ({
        Header: column,
        accessor: (row: string[]) => row[index],
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, columnsChanged]
  );

  return (
    <AutoSizer>
      {({ width, height }) => (
        <div
          style={{
            width,
            height,
            position: 'relative',
          }}
          className="table-root"
        >
          <TableContent
            data={memoizedRows}
            columns={memoizedColumns}
            onRowsRendered={onRowsRendered}
            width={width}
            resetTable={resetTable}
          ></TableContent>
        </div>
      )}
    </AutoSizer>
  );
}
