import React, { useMemo, useState } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
  useTable,
} from 'react-table';
import { AutoSizer, IndexRange } from 'react-virtualized';
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
    useBlockLayout,
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
            position: 'relative',
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
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {cell.render('Cell')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
      return result;
    },
    [prepareRow, rows, scrollPosition, totalColumnsWidth]
  );

  // Render the UI for your table
  return (
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
            height: '1.5rem',
          }}
        >
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <div {...column.getHeaderProps()} className="th">
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '100%',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.render('Header')}
                  </div>
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      style={{
                        display: 'inline-block',
                        background: 'blue',
                        width: '10px',
                        height: '100%',
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        transform: 'translateX(50%)',
                        zIndex: 1,
                        touchAction: 'none',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        {...getTableBodyProps()}
        style={{
          width: '100%',
          height: `calc(100% - 1.5rem - ${scrollBarSize}px)`,
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <>
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
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                {RenderRow}
              </FixedSizeList>
            </>
          )}
        </AutoSizer>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          overflowY: 'hidden',
          overflowX: 'scroll',
        }}
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
  );
}
