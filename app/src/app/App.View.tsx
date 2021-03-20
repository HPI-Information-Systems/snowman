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

import { IonApp, IonPage, IonSplitPane } from '@ionic/react';
import { AppProps } from 'app/AppProps';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import SideMenu from 'components/SideMenu/SideMenu';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { getViewComponentToViewId } from 'utils/viewMetaInfoHandlers';

const AppView = ({
  loadInitialState,
  currentViewId,
}: AppProps): JSX.Element => {
  useEffect(loadInitialState, [loadInitialState]);
  return (
    <IonApp>
      <IonSplitPane
        when="lg"
        contentId="mainViewContentId"
        class="split-pane-fixed"
      >
        {/* Side Menu (mainViewContentId used here!) */}
        <SideMenu contentId="mainViewContentId" />
        {/* Page Content */}
        <IonPage id="mainViewContentId">
          {React.createElement(getViewComponentToViewId(currentViewId))}
        </IonPage>
      </IonSplitPane>
      <ReactTooltip className="tooltip-fixed" html={true} place={'bottom'} />
      <GlobalLoading />
      <ToastContainer
        autoClose={5000}
        closeButton={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        closeOnClick={true}
        newestOnTop={true}
        limit={5}
        position={'top-right'}
        bodyClassName="Toastify__body-wrap"
      />
    </IonApp>
  );
};

export default AppView;
