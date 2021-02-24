/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import 'theme/variables.css';
/* Include toast styling */
import 'react-toastify/dist/ReactToastify.css';
/* Overwrite variables */
import 'theme/overwrites.css';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppProps } from 'app/AppProps';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import GlobalToast from 'components/GlobalToast/GlobalToast';
import SideMenu from 'components/SideMenu/SideMenu';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ToastConfiguration } from 'types/ToastConfiguration';
import history from 'utils/history';
import {
  getEmptyPath,
  getPathResolution,
  getPathToRootPage,
  IPathMapper,
} from 'utils/pathHandlers';

const AppView = ({ loadInitialState, toastStack }: AppProps): JSX.Element => {
  useEffect((): void => loadInitialState(), [loadInitialState]);
  return (
    <IonApp>
      <IonReactRouter history={history}>
        <IonSplitPane when="lg" contentId="main" class="split-pane-fixed">
          {/*--  Side Menu  --*/}
          <SideMenu />
          {/* Page Content */}
          <IonRouterOutlet id="main">
            <Redirect exact from={getEmptyPath()} to={getPathToRootPage()} />
            {getPathResolution().map((aPathMapper: IPathMapper) => (
              <Route
                key={aPathMapper.key}
                component={aPathMapper.component}
                exact={aPathMapper.path != null}
                path={aPathMapper.path}
              />
            ))}
          </IonRouterOutlet>

          {/* GlobalIndicators need to be view-independent. */}
          {toastStack.map(
            (aToastConfiguration: ToastConfiguration): JSX.Element => (
              <GlobalToast
                key={aToastConfiguration.id}
                message={aToastConfiguration.message}
                toastType={aToastConfiguration.type}
                toastId={aToastConfiguration.id}
              />
            )
          )}
          <GlobalLoading />
        </IonSplitPane>
      </IonReactRouter>
      <ToastContainer />
    </IonApp>
  );
};

export default AppView;
