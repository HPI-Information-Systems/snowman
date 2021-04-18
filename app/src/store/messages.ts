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

export interface SnowmanAction extends Action<string> {
  payload: ActionPayload;
  optionalPayload?: ActionPayload;
}

export type SnowmanGenericThunkAction<Return, Model> = ThunkAction<
  Return,
  Model,
  null,
  SnowmanAction
>;

export type SnowmanGenericDispatch<Model> = ThunkDispatch<
  Model,
  null,
  SnowmanAction
>;

export type SnowmanThunkAction<R> = SnowmanGenericThunkAction<R, Store>;

export type SnowmanDispatch = SnowmanGenericDispatch<Store>;
