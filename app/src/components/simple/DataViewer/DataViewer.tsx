import { FileResponseFormat, JSONFileResponse } from 'api';
import { openStandaloneDataViewerWindow } from 'components/simple/DataViewer/DataViewer.helpers';
import { DataViewerProps } from 'components/simple/DataViewer/DataViewerProps';
import Table from 'components/simple/DataViewer/Table/Table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InfiniteLoader } from 'react-virtualized';
import { TuplesLoader } from 'types/TuplesLoader';
import RequestHandler from 'utils/requestHandler';

const wrapLoadTuples = (
  loadTuples: TuplesLoader,
  start: number,
  stop: number
) => {
  return RequestHandler(() =>
    loadTuples(start, stop, FileResponseFormat.Json).then(
      (aResult: JSONFileResponse): JSONFileResponse => ({
        ...aResult,
        header: aResult.header.map((aColumn, index): string => {
          if (aColumn.length > 0) {
            return aColumn;
          } else {
            let currentColumn = `<empty ${index}>`;
            while (aResult.header.includes(currentColumn)) {
              currentColumn += ' ';
            }
            return currentColumn;
          }
        }),
      })
    )
  );
};

const DataViewer = ({
  tuplesCount,
  loadTuples,
  BATCH_SIZE = 500,
  title,
}: DataViewerProps): JSX.Element => {
  const mounted = useRef(true);
  const requestedRowCount = useRef(0);
  const resetVersion = useRef(0);
  const rows = useRef<string[][]>([]);
  const columns = useRef<string[]>([]);
  const [rowsChanged, triggerRowsChanged] = useState({});
  const [columnsChanged, triggerColumnsChanged] = useState({});

  const appendRows = useCallback((data: string[][], insertAt: number) => {
    if (data.length > 0) {
      while (rows.current.length < insertAt) {
        rows.current.push(columns.current.map(() => 'loading...'));
      }
      if (rows.current.length === insertAt) {
        rows.current.push(...data);
      } else {
        for (
          let rowsIndex = insertAt, dataIndex = 0;
          dataIndex < data.length;
          rowsIndex++, dataIndex++
        ) {
          rows.current[rowsIndex] = data[dataIndex];
        }
      }
    }
    triggerRowsChanged({});
  }, []);

  const requestRows = useCallback(
    (rowCount: number, updateHeader = false) => {
      const priorRowCount = requestedRowCount.current;
      const priorResetVersion = resetVersion.current;
      rowCount = Math.max(Math.min(rowCount, tuplesCount), priorRowCount);
      if (rowCount > priorRowCount || updateHeader) {
        requestedRowCount.current = rowCount;
        wrapLoadTuples(loadTuples, priorRowCount, rowCount).then(
          ({ header, data }) => {
            if (mounted && priorResetVersion === resetVersion.current) {
              if (updateHeader) {
                columns.current = header;
                triggerColumnsChanged({});
              }
              appendRows(data, priorRowCount);
            }
          }
        );
      }
    },
    [appendRows, loadTuples, tuplesCount]
  );

  useEffect(() => {
    ++resetVersion.current;
    requestedRowCount.current = 0;
    rows.current.length = 0;
    triggerRowsChanged({});
    requestRows(BATCH_SIZE, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTuples]);

  useEffect(() => {
    requestRows(requestedRowCount.current + BATCH_SIZE, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuplesCount]);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  return (
    <InfiniteLoader
      loadMoreRows={async ({ stopIndex }) => requestRows(stopIndex + 1)}
      isRowLoaded={({ index }) => index < rows.current.length}
      rowCount={tuplesCount}
      threshold={BATCH_SIZE}
      minimumBatchSize={BATCH_SIZE}
    >
      {({ onRowsRendered }) => (
        <Table
          onRowsRendered={onRowsRendered}
          rows={rows.current}
          columns={columns.current}
          rowsChanged={rowsChanged}
          columnsChanged={columnsChanged}
          openDataViewerWindow={() =>
            openStandaloneDataViewerWindow({
              tuplesCount,
              loadTuples,
              BATCH_SIZE,
              title,
            })
          }
        />
      )}
    </InfiniteLoader>
  );
};

export default DataViewer;
