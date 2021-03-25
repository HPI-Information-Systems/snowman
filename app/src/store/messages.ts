import {
  Algorithm,
  Dataset,
  Experiment,
  ExperimentIntersectionPairCountsItem,
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
  | Experiment[]
  | Experiment
  | Event
  | DragNDropDescriptor<string>
  | ExperimentIntersectionPairCountsItem[];

export interface SnowmanAction extends Action<string> {
  payload: ActionPayload;
  optionalPayload?: ActionPayload;
}

export type SnowmanThunkAction<R> = ThunkAction<R, Store, null, SnowmanAction>;

export type SnowmanDispatch = ThunkDispatch<Store, null, SnowmanAction>;
