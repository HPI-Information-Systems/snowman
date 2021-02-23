import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';

export interface DataViewerProps {
  columnHeaders: ColumnDescriptor[];
  tuples: unknown[];
}
