import React, { useMemo } from 'react';
import { Column, useBlockLayout, useTable } from 'react-table';
import { IndexRange } from 'react-virtualized';
import { FixedSizeList } from 'react-window';

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export default function DataViewerRaw({
  columns: rawColumns,
  rows: rawData,
  onRowsRendered,
  rowsUpdated,
}: {
  columns: Column<string[]>[];
  rows: string[][];
  onRowsRendered: (params: IndexRange) => void;
  rowsUpdated: number;
}): JSX.Element {
  const columns = useMemo(() => rawColumns, [rawColumns]);
  const data = useMemo(() => {
    console.log(`UPDATE`);
    return rawData;
  }, [rawData, rowsUpdated]);
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

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
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      console.log('B');
      const row = rows[index];
      prepareRow(row);
      const result = (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
      return result;
    },
    [prepareRow, rows]
  );

  // Render the UI for your table
  return (
    <div {...getTableProps()} className="table" style={{ background: 'white' }}>
      <div>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          onItemsRendered={(props) =>
            onRowsRendered({
              startIndex: props.visibleStartIndex,
              stopIndex: props.visibleStopIndex,
            })
          }
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth + scrollBarSize}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}
