export type RequestedRowsT = {
  resolve: () => void;
  rowCount: number;
};
export type StateT = {
  header: string[];
  rows: string[][];
  requestedRows: RequestedRowsT[];
  resetVersion: number;
};
