import { Action } from 'redux';

export interface SnowmanAction<ActionPayload = unknown> extends Action<string> {
  payload: ActionPayload;
  optionalPayload?: ActionPayload;
  optionalPayload2?: ActionPayload;
}
