import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersection,
  Metric,
} from 'api';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Store } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { ToastConfiguration } from 'types/ToastConfiguration';

export interface SnowmanAction extends Action<string> {
  payload:
    | Metric[]
    | ExperimentIntersection
    | string
    | string[]
    | boolean
    | File[]
    | DatasetTypes
    | experimentFileFormatEnum
    | Algorithm[]
    | Dataset
    | Dataset[]
    | number
    | Experiment[]
    | ToastConfiguration;
}

export type SnowmanThunkAction<R> = ThunkAction<R, Store, null, SnowmanAction>;

export type SnowmanDispatch = ThunkDispatch<Store, null, SnowmanAction>;
