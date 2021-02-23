import 'react-virtualized/styles.css';
import 'components/DataViewer/DataViewerStyles.css';

import { AutoSizerParams } from 'components/DataViewer/AutoSizerParams';
import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';
import { DataViewerProps } from 'components/DataViewer/DataViewerProps';
import { RowGetterParams } from 'components/DataViewer/RowGetterParams';
import { SortConfiguration } from 'components/DataViewer/SortConfiguration';
import * as lodash from 'lodash';
import React, { useState } from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const DataViewer = ({
  tuples,
  columnHeaders,
}: DataViewerProps): JSX.Element => {
  const [list, setList] = useState(tuples);

  React.useEffect(() => {
    setList(tuples);
  }, [tuples]);

  const [sortConfiguration, setSortConfiguration] = useState<SortConfiguration>(
    {
      sortBy: '',
      sortDirection: SortDirection.ASC,
    }
  );

  const _sortList = ({ sortBy, sortDirection }: SortConfiguration) => {
    const newList = lodash.sortBy(list, [sortBy]);
    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }
    return newList;
  };

  const _sort = ({ sortBy, sortDirection }: SortConfiguration): void => {
    setSortConfiguration({ sortBy: sortBy, sortDirection: sortDirection });
    setList(_sortList({ sortBy, sortDirection }));
  };

  return (
    <AutoSizer>
      {({ height, width }: AutoSizerParams) => (
        <Table
          width={width}
          height={height}
          rowClassName="table-row"
          headerHeight={20}
          rowHeight={30}
          sort={_sort}
          sortBy={sortConfiguration.sortBy}
          sortDirection={sortConfiguration.sortDirection}
          rowCount={list.length}
          rowGetter={({ index }: RowGetterParams) => list[index]}
        >
          {columnHeaders.map((aColumnHeader: ColumnDescriptor) => (
            <Column
              key={aColumnHeader.objKey}
              label={aColumnHeader.label}
              dataKey={aColumnHeader.objKey}
              width={width}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

export default DataViewer;
