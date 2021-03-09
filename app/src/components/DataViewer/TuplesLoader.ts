import { ExperimentIntersection } from 'api';
import { SnowmanThunkAction } from 'store/messages';

export interface TuplesLoader {
  (startIndex: number, stopIndex: number): SnowmanThunkAction<
    Promise<ExperimentIntersection>
  >;
}
