import { TuplesLoader } from 'types/TuplesLoader';

export enum DataViewerAppToHostActionType {
  READY = 'READY',
  LOAD_TUPLES = 'LOAD_TUPLES',
}
type DataViewerAppToHostAction<
  ActionType extends DataViewerAppToHostActionType = DataViewerAppToHostActionType
> = {
  type: ActionType;
  payload: ActionType extends DataViewerAppToHostActionType.LOAD_TUPLES
    ? { id: number; params: Parameters<TuplesLoader> }
    : ActionType extends DataViewerAppToHostActionType
    ? undefined
    : never;
};

export function postActionToHost<
  ActionType extends DataViewerAppToHostActionType
>(action: DataViewerAppToHostAction<ActionType>): void {
  window.parent.postMessage(action, window.origin);
}

export function onActionFromClient<
  ActionType extends DataViewerAppToHostActionType
>(
  target: Window,
  actionType: ActionType,
  callback: (payload: DataViewerAppToHostAction<ActionType>['payload']) => void
): void {
  target.addEventListener(
    'message',
    ({ data }: { data: DataViewerAppToHostAction }) => {
      if (data.type === actionType) {
        callback(
          data.payload as DataViewerAppToHostAction<ActionType>['payload']
        );
      }
    }
  );
}
