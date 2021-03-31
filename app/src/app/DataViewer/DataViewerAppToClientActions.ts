import { TuplesLoader } from 'types/TuplesLoader';
import { Await } from 'types/util';

import { DataViewerOwnPropsNoTuplesLoader } from '../../components/DataViewer/DataViewerProps';

export enum DataViewerAppToClientActionType {
  TUPLES_LOADER_RESPONSE = 'TUPLES_LOADER_RESPONSE',
  TUPLES_LOADER_FAILED = 'TUPLES_LOADER_FAILED',
  DATA_VIEWER_PARAMS = 'DATA_VIEWER_PARAMS',
  WINDOW_CLOSED = 'WINDOW_CLOSED',
}

type DataViewerAppToClientAction<
  ActionType extends DataViewerAppToClientActionType = DataViewerAppToClientActionType
> = {
  type: ActionType;
  payload: ActionType extends DataViewerAppToClientActionType.TUPLES_LOADER_RESPONSE
    ? { id: number; response: Await<ReturnType<TuplesLoader>> }
    : ActionType extends DataViewerAppToClientActionType.TUPLES_LOADER_FAILED
    ? { id: number; error: string }
    : ActionType extends DataViewerAppToClientActionType.DATA_VIEWER_PARAMS
    ? DataViewerOwnPropsNoTuplesLoader
    : ActionType extends DataViewerAppToClientActionType.WINDOW_CLOSED
    ? undefined
    : never;
};

export function postActionToClient<
  ActionType extends DataViewerAppToClientActionType
>(target: Window, action: DataViewerAppToClientAction<ActionType>): void {
  target.postMessage(action, target.origin);
}

export function onActionFromHost<
  ActionType extends DataViewerAppToClientActionType
>(
  actionType: ActionType,
  callback: (
    payload: DataViewerAppToClientAction<ActionType>['payload']
  ) => void
): void {
  window.addEventListener(
    'message',
    ({ data }: { data: DataViewerAppToClientAction }) => {
      if (data.type === actionType) {
        callback(
          data.payload as DataViewerAppToClientAction<ActionType>['payload']
        );
      }
    }
  );
}
