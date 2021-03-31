import 'components/DataViewer/Table/TableHeaderStyles.css';

import ScrollSync from 'components/DataViewer/Table/ScrollSync/ScrollSync';
import { TableHeaderProps } from 'components/DataViewer/Table/TableHeaderProps';
import React, { useCallback, useMemo, useRef } from 'react';

export const tableHeaderHeight = '3rem';

export default function TableHeader({
  headerGroups,
  setColumnOrder,
  visibleColumns,
}: TableHeaderProps): JSX.Element {
  const draggedColumn = useRef<string>();
  const columnIds = useMemo(() => visibleColumns.map(({ id }) => id), [
    visibleColumns,
  ]);
  const reorderColumns = useCallback(
    (targetId: string) => {
      console.log(targetId);
      if (draggedColumn.current) {
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
            }}
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
                onDrop={() => {
                  reorderColumns(column.id);
                  draggedColumn.current = undefined;
                }}
              >
                {column.render('Header')}
                <div
                  draggable
                  className="reorder"
                  onDragStart={() => {
                    draggedColumn.current = column.id;
                  }}
                />
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={column.isResizing ? 'resizing' : 'resize'}
                  >
                    <div className={'resize-indicator'} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </ScrollSync>
    </div>
  );
}
