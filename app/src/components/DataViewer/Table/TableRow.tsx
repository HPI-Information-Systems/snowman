import ScrollSync from 'components/DataViewer/Table/ScrollSync/ScrollSync';
import { TableContext } from 'components/DataViewer/Table/TableContext';
import React, { useContext } from 'react';
import { ListChildComponentProps } from 'react-window';

export default function TableRow({
  index,
  style,
}: ListChildComponentProps): JSX.Element {
  const { rows, prepareRow } = useContext(TableContext);
  const row = rows[index];
  prepareRow(row);
  const result = (
    <div
      {...row.getRowProps({
        style,
      })}
      className="tr"
    >
      <ScrollSync>
        {row.cells.map((cell) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div {...cell.getCellProps()} className="td">
              <div
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {cell.render('Cell')}
              </div>
            </div>
          );
        })}
      </ScrollSync>
    </div>
  );
  return result;
}
