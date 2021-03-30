import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import DataViewerRaw from 'components/DataViewer/DataViewerRaw';
import { StateT } from 'components/DataViewer/DataViewerTypes';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InfiniteLoader } from 'react-virtualized';
import { SnowmanDispatch } from 'store/messages';
import RequestHandler from 'utils/requestHandler';

const DataViewer = ({
  tuplesCount,
  loadTuples,
  BATCH_SIZE = 500,
}: DataViewerProps): JSX.Element => {
  const dispatch: SnowmanDispatch = useDispatch();
  function wrappedLoadTuples(start: number, stop: number) {
    return RequestHandler(() => loadTuples(start, stop), dispatch);
  }
  const [{ header, rows, rowsUpdated }, setState] = useState<StateT>({
    header: [],
    rows: [],
    requestedCount: 0,
    resetVersion: 0,
    rowsUpdated: 0,
  });

  function getState(callback: (state: StateT) => void) {
    setState((newState) => {
      callback(newState);
      return newState;
    });
  }

  function requestRows(rowCount: number): void {
    getState(
      ({
        header,
        rows,
        requestedCount: firstRequestedCount,
        resetVersion: firstResetVersion,
        rowsUpdated,
      }) => {
        if (rowCount > firstRequestedCount) {
          setState({
            header,
            rows,
            requestedCount: rowCount,
            resetVersion: firstResetVersion,
            rowsUpdated,
          });
          wrappedLoadTuples(firstRequestedCount, rowCount).then(
            ({ header, data }) => {
              getState(
                ({ requestedCount, rows, resetVersion, rowsUpdated }) => {
                  if (firstResetVersion === resetVersion) {
                    while (rows.length < firstRequestedCount) {
                      rows.push(header.map(() => 'loading...'));
                    }
                    if (rows.length === firstRequestedCount) {
                      rows.push(...data);
                    } else {
                      for (
                        let index = firstRequestedCount, dataIndex = 0;
                        dataIndex < data.length;
                        index++, dataIndex++
                      ) {
                        rows[index] = data[dataIndex];
                      }
                    }
                    setState({
                      header,
                      rows,
                      requestedCount,
                      resetVersion,
                      rowsUpdated: rowsUpdated + 1,
                    });
                  }
                }
              );
            }
          );
        }
      }
    );
  }

  useEffect(() => {
    getState(({ header, rows, resetVersion, rowsUpdated }) => {
      const newResetVersion = resetVersion + 1;
      setState({
        header,
        requestedCount: Number.POSITIVE_INFINITY,
        rows,
        resetVersion: newResetVersion,
        rowsUpdated,
      });
      wrappedLoadTuples(0, BATCH_SIZE).then(({ header, data }) =>
        getState(({ resetVersion, rowsUpdated }) => {
          if (resetVersion === newResetVersion) {
            setState({
              header,
              rows: data,
              requestedCount: data.length,
              resetVersion,
              rowsUpdated: rowsUpdated + 1,
            });
          }
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTuples]);

  useEffect(() => {
    getState(({ rows }) => {
      requestRows(Math.min(rows.length + BATCH_SIZE, tuplesCount));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuplesCount]);

  return (
    <InfiniteLoader
      loadMoreRows={async ({ stopIndex }) => {
        requestRows(stopIndex + 1);
      }}
      isRowLoaded={({ index }) => index < rows.length}
      rowCount={tuplesCount}
      threshold={BATCH_SIZE}
      minimumBatchSize={BATCH_SIZE}
    >
      {({ onRowsRendered, registerChild }) => (
        <DataViewerRaw
          onRowsRendered={onRowsRendered}
          columns={header.map((column, index) => ({
            Header: column,
            accessor: (row: string[]) => row[index],
          }))}
          rows={rows}
          rowsUpdated={rowsUpdated}
        />
      )}
    </InfiniteLoader>
  );
};

export default DataViewer;
