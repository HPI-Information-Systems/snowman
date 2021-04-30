import { ThunkDispatch } from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

export type SnowmanDispatch = ThunkDispatch<unknown, null, SnowmanAction>;
