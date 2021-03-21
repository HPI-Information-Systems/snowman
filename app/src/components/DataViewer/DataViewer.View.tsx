import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import React, { useEffect, useState } from 'react';
import { AutoSizer, Column, InfiniteLoader, Table } from 'react-virtualized';

const BATCH_SIZE = 1000;

const DataViewerView = ({
  tuplesCount,
  loadTuples,
}: DataViewerProps): JSX.Element => {
  const [header, setHeader] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [requestedRowsLength, setRequestedRowsLength] = useState(0);
  const [sync, setSync] = useState<Promise<unknown>>(Promise.resolve());

  useEffect(() => {
    setRequestedRowsLength(0);
    setRows([]);
    setSync(
      Promise.all([loadTuples(0, BATCH_SIZE), sync])
        .then(([data]) => {
          setRequestedRowsLength(data.data.length);
          setRows(data.data);
          setHeader(data.header);
        })
        .catch()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTuples, tuplesCount]);

  return (
    <InfiniteLoader
      loadMoreRows={async ({ stopIndex }) => {
        if (stopIndex > requestedRowsLength) {
          setRequestedRowsLength(stopIndex);
          const awaitLoad = Promise.all([
            loadTuples(requestedRowsLength, stopIndex),
            sync,
          ])
            .then(([{ data }]) => rows.push(...data) && setRows(rows))
            .catch();
          setSync(awaitLoad);
          await awaitLoad;
        }
      }}
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
