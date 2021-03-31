import ScrollSync from 'components/DataViewer/Table/ScrollSync/ScrollSync';
import { TableContext } from 'components/DataViewer/Table/TableContext';
import React, { useContext } from 'react';

export const tableHeaderHeight = '1.5rem';

export default function TableHeader(): JSX.Element {
  const { headerGroups } = useContext(TableContext);
  return (
    <ScrollSync>
      {headerGroups.map((headerGroup) => (
        // eslint-disable-next-line react/jsx-key
        <div
          {...headerGroup.getHeaderGroupProps()}
          style={{ height: tableHeaderHeight, overflow: 'hidden' }}
        >
          {headerGroup.headers.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <div {...column.getHeaderProps()}>
              <div
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  width: '100%',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.render('Header')}
              </div>
              {column.canResize && (
                <div
                  {...column.getResizerProps()}
                  style={{
                    display: 'inline-block',
                    background: 'blue',
                    width: '10px',
                    height: '100%',
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    transform: 'translateX(50%)',
                    zIndex: 1,
                    touchAction: 'none',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </ScrollSync>
  );
}
