import { ExperimentIntersection } from 'api';

export interface TuplesLoader {
  (startIndex: number, stopIndex: number): Promise<ExperimentIntersection>;
}
