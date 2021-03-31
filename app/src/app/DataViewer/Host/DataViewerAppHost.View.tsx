import {
  DataViewerAppToClientActionType,
  postActionToClient,
} from 'app/DataViewer/DataViewerAppToClientActions';
import {
  DataViewerAppHostContext,
  dataViewerAppWindowName,
} from 'app/DataViewer/Host/DataViewerAppHostContext';
import { DataViewerAppHostProps } from 'app/DataViewer/Host/DataViewerAppHostProps';
import {
  DataViewerAppToHostActionType,
  onActionFromClient,
} from 'app/DataViewer/Host/DataViewerAppToHostActions';
import { DataViewerOwnProps } from 'components/DataViewer/DataViewerProps';
import React, { PropsWithChildren, useCallback } from 'react';
import { unwrapError } from 'utils/requestHandler';

export default function DataViewerAppHostView({
  children,
  couldNotOpenChildWindow,
}: PropsWithChildren<DataViewerAppHostProps>): JSX.Element {
  const openDataViewerWindow = useCallback(
    ({ loadTuples, ...props }: DataViewerOwnProps) => {
      const targetWindow = window.open(
        window.origin,
        dataViewerAppWindowName()
      );
      if (targetWindow) {
        window.addEventListener('beforeunload', () =>
          postActionToClient(targetWindow, {
            type: DataViewerAppToClientActionType.WINDOW_CLOSED,
            payload: undefined,
          })
        );
        onActionFromClient(
          targetWindow,
          DataViewerAppToHostActionType.LOAD_TUPLES,
          ({ id, params }) =>
            loadTuples(...params)
              .then((response) =>
                postActionToClient(targetWindow, {
                  type: DataViewerAppToClientActionType.TUPLES_LOADER_RESPONSE,
                  payload: { response, id },
                })
              )
              .catch(async (error) =>
                postActionToClient(targetWindow, {
                  type: DataViewerAppToClientActionType.TUPLES_LOADER_FAILED,
                  payload: { id, error: await unwrapError(error) },
                })
              )
        );
        onActionFromClient(
          targetWindow,
          DataViewerAppToHostActionType.READY,
          () =>
            postActionToClient(targetWindow, {
              type: DataViewerAppToClientActionType.DATA_VIEWER_PARAMS,
              payload: props,
            })
        );
      } else {
        couldNotOpenChildWindow();
      }
    },
    [couldNotOpenChildWindow]
  );
  return (
    <DataViewerAppHostContext.Provider value={{ openDataViewerWindow }}>
      {children}
    </DataViewerAppHostContext.Provider>
  );
}
