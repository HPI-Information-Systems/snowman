import { JSONFileResponse } from 'api';

export interface TuplesLoader {
  (startIndex: number, stopIndex: number): Promise<JSONFileResponse>;
}
