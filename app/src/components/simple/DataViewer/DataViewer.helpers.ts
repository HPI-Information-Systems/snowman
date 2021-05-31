import { FileResponseFormat } from 'api';
import {
  DataViewerAppToClientActionType,
  postActionToClient,
} from 'apps/DataViewerApp/actionsToClient';
import {
  DataViewerAppToHostActionType,
  onActionFromClient,
} from 'apps/DataViewerApp/actionsToHost';
import { showToast } from 'apps/SnowmanApp/store/ActionLogicActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { DataViewerOwnProps } from 'components/simple/DataViewer/DataViewerProps';
import { saveAs } from 'file-saver';
import {
  COULD_NOT_OPEN_CHILD_WINDOW_ERROR,
  SUCCESS_TO_DOWNLOAD_CSV,
} from 'structs/statusMessages';
import { ToastType } from 'types/ToastTypes';
import { TuplesLoader } from 'types/TuplesLoader';
import { viewIdQueryParam } from 'types/ViewIdQueryParam';
import { ViewIDs } from 'types/ViewIDs';
import RequestHandler, { unwrapError } from 'utils/requestHandler';

const windowNameBase = 'snowman-benchmark';
let nextWindowId = 0;
const nextWindowName = (): string => {
  return `${windowNameBase}-${++nextWindowId}-${window.name}`;
};

const openViewInNewWindow = (viewId: ViewIDs): Window | null => {
  const targetWindow = window.open(
    `${window.location.origin}${window.location.pathname}?${viewIdQueryParam}=${viewId}`,
    nextWindowName()
  );
  if (!targetWindow) {
    SnowmanAppDispatch(
      showToast(COULD_NOT_OPEN_CHILD_WINDOW_ERROR, ToastType.Error)
    );
  }
  return targetWindow;
};

export const openStandaloneDataViewerWindow = ({
  loadTuples,
  ...props
}: DataViewerOwnProps): void => {
  const targetWindow = openViewInNewWindow(ViewIDs.DataViewerApp);
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
    onActionFromClient(targetWindow, DataViewerAppToHostActionType.READY, () =>
      postActionToClient(targetWindow, {
        type: DataViewerAppToClientActionType.DATA_VIEWER_PARAMS,
        payload: props,
      })
    );
  } else {
    SnowmanAppDispatch(
      showToast(COULD_NOT_OPEN_CHILD_WINDOW_ERROR, ToastType.Error)
    );
  }
};

export const downloadDataViewerContent = (
  loadTuples: TuplesLoader,
  fileName: string
): void => {
  RequestHandler(
    () => loadTuples(0, Number.MAX_SAFE_INTEGER, FileResponseFormat.Csv),
    SUCCESS_TO_DOWNLOAD_CSV,
    true
  ).then((blob) => {
    // Todo: Properly implement this in the backend!
    blob = blob.slice(0, blob.size, 'text/csv');
    console.log('Download', fileName, blob.type);
    saveAs(blob, fileName + '.csv');
  });
};

export const cleanFileName = (title: string): string =>
  title.replaceAll(' ', '_');
