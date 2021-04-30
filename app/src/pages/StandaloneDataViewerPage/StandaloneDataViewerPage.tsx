import 'pages/StandaloneDataViewerPage/StandaloneDataViewerStyles.css';

import { IonSpinner } from '@ionic/react';
import DataViewer from 'components/simple/DataViewer/DataViewer';
import { DataViewerOwnPropsNoTuplesLoader } from 'components/simple/DataViewer/DataViewerProps';
import {
  DataViewerAppToClientActionType,
  onActionFromHost,
} from 'pages/StandaloneDataViewerPage/actionsToClient';
import {
  DataViewerAppToHostActionType,
  postActionToHost,
} from 'pages/StandaloneDataViewerPage/actionsToHost';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TuplesLoader } from 'types/TuplesLoader';
import { Await } from 'types/util';

export default function StandaloneDataViewerPage(): JSX.Element {
  const [params, setParams] = useState<DataViewerOwnPropsNoTuplesLoader>();
  const pendingLoadTuples = useRef<
    Map<
      number,
      {
        resolve: (response: Await<ReturnType<TuplesLoader>>) => void;
        reject: (error: string) => void;
      }
    >
  >(new Map());
  const nextLoadTuplesId = useRef(0);

  const loadTuples = useCallback<TuplesLoader>(
    (...params) =>
      new Promise((resolve, reject) => {
        pendingLoadTuples.current.set(nextLoadTuplesId.current, {
          resolve,
          reject,
        });
        postActionToHost({
          type: DataViewerAppToHostActionType.LOAD_TUPLES,
          payload: {
            id: nextLoadTuplesId.current,
            params,
          },
        });
        nextLoadTuplesId.current++;
      }),
    []
  );

  useEffect(() => {
    onActionFromHost(
      DataViewerAppToClientActionType.TUPLES_LOADER_RESPONSE,
      ({ id, response }) => {
        const resolve = pendingLoadTuples.current.get(id)?.resolve;
        if (resolve) {
          pendingLoadTuples.current.delete(id);
          resolve(response);
        }
      }
    );
    onActionFromHost(
      DataViewerAppToClientActionType.TUPLES_LOADER_FAILED,
      ({ error, id }) => {
        const reject = pendingLoadTuples.current.get(id)?.reject;
        if (reject) {
          pendingLoadTuples.current.delete(id);
          reject(error);
        }
      }
    );
    onActionFromHost(
      DataViewerAppToClientActionType.DATA_VIEWER_PARAMS,
      ({ title, ...params }) => {
        document.title = `Snowman - ${title}`;
        setParams({ title, ...params });
      }
    );
    onActionFromHost(DataViewerAppToClientActionType.WINDOW_CLOSED, () =>
      window.close()
    );

    postActionToHost({
      type: DataViewerAppToHostActionType.READY,
      payload: undefined,
    });
  }, []);

  return (
    <div className="data-viewer-app">
      {params ? (
        <DataViewer {...params} loadTuples={loadTuples} />
      ) : (
        <h1 className="data-viewer-app-loading">
          <div className="data-viewer-app-loading-spinner">
            <IonSpinner color="dark" />
          </div>
          Connecting to Snowman host
        </h1>
      )}
    </div>
  );
}
