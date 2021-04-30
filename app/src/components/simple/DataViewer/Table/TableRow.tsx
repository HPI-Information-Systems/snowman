import 'components/simple/DataVieweraViewer/Table/TableRowStyles.css';

import ScrollSync from 'components/simple/DataViewer/Table/ScrollSync/ScrollSync';
import { TableContext } from 'components/simple/DataViewer/Table/TableContext';
import React, { useContext } from 'react';
import { ListChildComponentProps } from 'react-window';

export default function TableRow({
  index,
  style,
}: ListChildComponentProps): JSX.Element {
  const { rows, prepareRow } = useContext(TableContext);
  const row = rows[index];
  prepareRow(row);
  return (
    <div
      {...row.getRowProps({
        style,
      })}
      className="table-row"
    >
      <ScrollSync>
        {row.cells.map((cell) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div {...cell.getCellProps()} className="cell">
              {cell.render('Cell')}
            </div>
          );
        })}
      </ScrollSync>
    </div>
  );
}
