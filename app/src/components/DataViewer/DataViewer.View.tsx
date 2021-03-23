import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import React, { useEffect, useState } from 'react';
import { AutoSizer, Column, InfiniteLoader, Table } from 'react-virtualized';

import { RequestedRowsT, StateT } from './DataViewer.types';

const DataViewerView = ({
  tuplesCount,
  loadTuples,
  BATCH_SIZE = 1000,
}: DataViewerProps): JSX.Element => {
  const [{ header, rows, requestedRows }, setState] = useState<StateT>({
    header: [],
    rows: [],
    requestedRows: [],
    resetVersion: 0,
  });

  function getState(callback: (state: StateT) => void) {
    setState((newState) => {
      callback(newState);
      return newState;
    });
  }

  async function requestRows(rowCount: number): Promise<void> {
    return new Promise((resolve) =>
      getState(({ header, rows, requestedRows, resetVersion }) => {
        const request: RequestedRowsT = {
          rowCount,
          resolve,
        };
        setState({
          header,
          rows,
          requestedRows: [...requestedRows, request],
          resetVersion,
        });
        const maxRequestedRowsLength = Math.max(
          ...requestedRows.map(({ rowCount: length }) => length),
          rows.length
        );
        if (rowCount > maxRequestedRowsLength) {
          Promise.all([
            loadTuples(maxRequestedRowsLength, rowCount),
            requestRows(maxRequestedRowsLength),
          ]).then(async ([{ header, data }]) => {
            getState(({ requestedRows, rows, resetVersion }) => {
              if (requestedRows.includes(request)) {
                rows.push(...data);
                setState({
                  header,
                  rows,
                  requestedRows,
                  resetVersion,
                });
              }
            });
          });
        }
      })
    );
  }

  useEffect(() => {
    getState(({ header, rows, requestedRows, resetVersion }) => {
      const loadingRequestedRows = requestedRows.filter((request) => {
        if (request.rowCount <= rows.length) {
          request.resolve();
          return false;
        } else {
          return true;
        }
      });
      if (loadingRequestedRows.length !== requestedRows.length) {
        setState({
          rows,
          header,
          requestedRows: loadingRequestedRows,
          resetVersion,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedRows, rows]);

  useEffect(() => {
    getState(({ header, rows, requestedRows, resetVersion }) => {
      const newResetVersion = resetVersion + 1;
      setState({
        header,
        requestedRows,
        rows,
        resetVersion: newResetVersion,
      });
      loadTuples(0, BATCH_SIZE).then(({ header, data }) =>
        getState(({ requestedRows, resetVersion }) => {
          if (resetVersion === newResetVersion) {
            requestedRows.forEach(({ resolve }) => resolve());
            setState({
              header,
              rows: data,
              requestedRows: [],
              resetVersion,
            });
          }
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTuples]);

  return (
    <InfiniteLoader
      loadMoreRows={({ stopIndex }) => requestRows(stopIndex)}
      isRowLoaded={({ index }) => index < rows.length}
      rowCount={tuplesCount}
      threshold={BATCH_SIZE}
      minimumBatchSize={BATCH_SIZE}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <Table
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              width={width}
              height={height}
              rowClassName="table-row"
              headerHeight={20}
              rowHeight={30}
              overscanRowCount={0}
              rowCount={rows.length}
              rowGetter={({ index }: { index: number }): unknown => {
                const dataRow: Record<string, string> = {};
                header.forEach((_: string, headerIndex: number): void => {
                  dataRow[headerIndex] =
                    index < rows.length ? rows[index][headerIndex] : '';
                });
                return dataRow;
              }}
            >
              {header.map((headerLabel: string, index: number) => (
                <Column
                  key={`${index}-${headerLabel}`}
                  label={headerLabel}
                  dataKey={index.toString()}
                  width={width}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default DataViewerView;
