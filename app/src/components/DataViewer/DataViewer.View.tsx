import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import React, { useEffect } from 'react';
import { AutoSizer, Column, InfiniteLoader, Table } from 'react-virtualized';

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
              rowCount={tuplesCount}
              rowGetter={({ index }: { index: number }): unknown => {
                const dataRow: Record<string, string> = {};
                // Todo: Evaluate whether this is a proper fix
                if (data.data[index] === undefined) return dataRow;
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
