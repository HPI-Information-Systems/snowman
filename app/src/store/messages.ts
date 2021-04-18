import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersectionCount,
  FileResponse,
  Metric,
} from 'api';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Store } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

type ActionPayload =
  | Metric[]
  | Metric[][]
  | FileResponse
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
  | undefined
  | Experiment[]
  | Experiment
  | Event
  | DragNDropDescriptor<string>
  | ExperimentIntersectionCount[]
  | {
      excluded: Experiment[];
      included: Experiment[];
    };

export interface SnowmanGenericAction<T> extends Action<T> {
  payload: ActionPayload;
  optionalPayload?: ActionPayload;
}

export type SnowmanAction = SnowmanGenericAction<string>;

export type SnowmanThunkAction<R> = ThunkAction<R, Store, null, SnowmanAction>;

export type SnowmanDispatch = ThunkDispatch<Store, null, SnowmanAction>;
