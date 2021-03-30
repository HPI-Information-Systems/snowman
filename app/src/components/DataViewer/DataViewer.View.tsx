import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import DataViewerRaw from 'components/DataViewer/DataViewerRaw';
import React, { useEffect, useRef, useState } from 'react';
import { Column } from 'react-table';
import { InfiniteLoader } from 'react-virtualized';

const DataViewerView = ({
  tuplesCount,
  loadTuples,
  wrapLoadTuples,
  BATCH_SIZE = 500,
}: DataViewerProps): JSX.Element => {
  const mounted = useRef(true);
  const requestedRowCount = useRef(0);
  const resetVersion = useRef(0);
  const rows = useRef<string[][]>([]);
  const columns = useRef<Column<string[]>[]>([]);
  const [change, triggerChange] = useState({});

  function requestRows(rowCount: number): void {
    rowCount = Math.min(rowCount, tuplesCount);
    const priorRowCount = requestedRowCount.current;
    const priorResetVersion = resetVersion.current;
    if (rowCount > priorRowCount) {
      requestedRowCount.current = rowCount;
      wrapLoadTuples(loadTuples, priorRowCount, rowCount).then(
        ({ header, data }) => {
          if (mounted && priorResetVersion === resetVersion.current) {
            columns.current = header.map((column, index) => ({
              Header: column,
              accessor: (row: string[]) => row[index],
            }));
            if (data.length > 0) {
              while (rows.current.length < priorRowCount) {
                rows.current.push(header.map(() => 'loading...'));
              }
              if (rows.current.length === priorRowCount) {
                rows.current.push(...data);
              } else {
                for (
                  let rowsIndex = priorRowCount, dataIndex = 0;
                  dataIndex < data.length;
                  rowsIndex++, dataIndex++
                ) {
                  rows.current[rowsIndex] = data[dataIndex];
                }
              }
            }
            triggerChange({});
          }
        }
      );
    }
  }

  useEffect(() => {
    ++resetVersion.current;
    requestedRowCount.current = 0;
    rows.current.length = 0;
    triggerChange({});
    requestRows(BATCH_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTuples]);

  useEffect(() => {
    requestRows(requestedRowCount.current + BATCH_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuplesCount]);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <InfiniteLoader
      loadMoreRows={async ({ stopIndex }) => {
        requestRows(stopIndex + 1);
      }}
      isRowLoaded={({ index }) => index < rows.current.length}
      rowCount={tuplesCount}
      threshold={BATCH_SIZE}
      minimumBatchSize={BATCH_SIZE}
    >
      {({ onRowsRendered, registerChild }) => (
        <DataViewerRaw
          onRowsRendered={onRowsRendered}
          columns={columns.current}
          rows={rows.current}
          rowsUpdated={change}
        />
      )}
    </InfiniteLoader>
  );
};

export default DataViewerView;
