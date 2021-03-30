import React, { useMemo, useState } from 'react';
import {
  Column,
  useAbsoluteLayout,
  useBlockLayout,
  useFlexLayout,
  useResizeColumns,
  useTable,
} from 'react-table';
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
  rowsUpdated: unknown;
}): JSX.Element {
  const columns = useMemo(() => rawColumns, [rawColumns]);
  const data = useMemo(() => {
    return new Proxy(rawData, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    useFlexLayout,
    useResizeColumns
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      const result = (
        <div
          style={{
            width: `${totalColumnsWidth + scrollBarSize}px`,
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
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
        </div>
      );
      return result;
    },
    [prepareRow, rows, scrollPosition]
  );

  // Render the UI for your table
  return (
    <div {...getTableProps()} className="table" style={{ background: 'white' }}>
      <div
        style={{
          width: `100%`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${totalColumnsWidth + scrollBarSize}px`,
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      style={{
                        width: '0.5rem',
                        height: '100%',
                        background: 'orange',
                        float: 'right',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          onItemsRendered={(props) =>
            onRowsRendered({
              startIndex: props.visibleStartIndex,
              stopIndex: props.visibleStopIndex,
            })
          }
          height={370}
          itemCount={rows.length}
          itemSize={35}
          width={'100%'}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {RenderRow}
        </FixedSizeList>
        <div
          style={{ width: '100%', overflowY: 'hidden', overflowX: 'scroll' }}
          onScroll={(e) => {
            setScrollPosition(e.currentTarget.scrollLeft);
          }}
        >
          <div
            style={{
              width: `${totalColumnsWidth + scrollBarSize}px`,
              height: '1px',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
