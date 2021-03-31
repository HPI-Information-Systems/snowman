import 'components/DataViewer/Table/TableHeaderStyles.css';

import ScrollSync from 'components/DataViewer/Table/ScrollSync/ScrollSync';
import { TableContext } from 'components/DataViewer/Table/TableContext';
import React, { useContext } from 'react';

export const tableHeaderHeight = '3rem';

export default function TableHeader(): JSX.Element {
  const { headerGroups } = useContext(TableContext);
  return (
    <ScrollSync>
      {headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <div
          {...headerGroup.getHeaderGroupProps()}
          style={{
            height: tableHeaderHeight,
            lineHeight: tableHeaderHeight,
          }}
          className="table-header"
        >
          {headerGroup.headers.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <div {...column.getHeaderProps()}>
              <div className="cell">
                {column.render('Header')}
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={column.isResizing ? 'resizing' : 'resize'}
                  >
                    <div className={'resize-indicator'} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </ScrollSync>
  );
}
