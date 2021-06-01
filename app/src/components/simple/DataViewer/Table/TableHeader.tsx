import 'components/simple/DataViewer/Table/TableHeaderStyles.css';

import ScrollSync from 'components/simple/DataViewer/Table/ScrollSync/ScrollSync';
import { TableHeaderProps } from 'components/simple/DataViewer/Table/TableProps';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { scrollbarWidth } from 'utils/scrollbarWidth';

export const tableHeaderHeight = '3rem';

export default function TableHeader({
  headerGroups,
  setColumnOrder,
  visibleColumns,
}: TableHeaderProps): JSX.Element {
  const draggedColumn = useRef<string>();
  const setDragTimeout = useRef<number>();
  const [dragging, setDragging] = useState(false);
  const columnIds = useMemo(() => visibleColumns.map(({ id }) => id), [
    visibleColumns,
  ]);

  const reorderColumns = useCallback(
    (targetId: string) => {
      if (draggedColumn.current !== undefined) {
        const from = columnIds.indexOf(draggedColumn.current);
        const to = columnIds.indexOf(targetId);
        if (from !== to && from !== -1 && to !== -1) {
          const newColumnOrder = [
            ...columnIds.slice(0, from),
            ...columnIds.slice(from + 1),
          ];
          newColumnOrder.splice(to, 0, draggedColumn.current);
          setColumnOrder(newColumnOrder);
        }
      }
    },
    [columnIds, setColumnOrder]
  );
  return (
    <div className="table-header">
      <ScrollSync>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <div
            {...headerGroup.getHeaderGroupProps()}
            style={{
              height: tableHeaderHeight,
              lineHeight: tableHeaderHeight,
              display: dragging ? 'none' : '',
            }}
          >
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <div {...column.getHeaderProps()} className="cell">
                {column.render('Header')}
                <div
                  draggable
                  className="reorder"
                  onDragStart={() => {
                    setDragTimeout.current = window.setTimeout(
                      () => setDragging(true),
                      100
                    );
                    draggedColumn.current = column.id;
                  }}
                  onDragEnd={() => {
                    window.clearTimeout(setDragTimeout.current);
                    setDragging(false);
                    draggedColumn.current = undefined;
                  }}
                />
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={column.isResizing ? 'resizing' : 'resize'}
                  >
                    <div className="resize-indicator" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </ScrollSync>
      {headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <div
          {...headerGroup.getHeaderGroupProps()}
          style={{
            height: tableHeaderHeight,
            lineHeight: tableHeaderHeight,
            display: dragging ? 'flex' : 'none',
            width: `calc(100% - ${scrollbarWidth()}px)`,
          }}
          className="reordering-container"
        >
          {headerGroup.headers.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <div
              {...column.getHeaderProps()}
              className="cell"
              onDragOver={(e) => {
                reorderColumns(column.id);
                e.preventDefault();
              }}
              onDrop={() => reorderColumns(column.id)}
            >
              {column.render('Header')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
