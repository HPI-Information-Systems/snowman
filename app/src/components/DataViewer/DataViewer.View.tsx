import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import React, { useEffect } from 'react';
import { InfiniteLoader } from 'react-virtualized';
import { AutoSizer, Column, Table } from 'react-virtualized';

const DataViewerView = ({
  tuplesCount,
  handleLoadTuples,
  resetDataViewer,
  data,
}: DataViewerProps): JSX.Element => {
  useEffect((): void => resetDataViewer(), [tuplesCount, resetDataViewer]);
  return (
    <InfiniteLoader
      loadMoreRows={handleLoadTuples}
      isRowLoaded={({ index }) => !!data.data[index]}
      rowCount={tuplesCount}
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
              rowCount={data.data.length}
              rowGetter={({ index }: { index: number }): unknown => {
                const dataRow: Record<string, string> = {};
                data.header.forEach((_: string, headerIndex: number): void => {
                  dataRow[headerIndex] = data.data[index][headerIndex];
                });
                return dataRow;
              }}
            >
              {data.header.map((headerLabel: string, index: number) => (
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
