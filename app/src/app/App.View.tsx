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
import { DefaultAppProps } from 'app/AppProps';
import BenchmarkSelector from 'components/BenchmarkSelector/BenchmarkSelector';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import SideMenu from 'components/SideMenu/SideMenu';
import TopNavBar from 'components/TopNavBar/TopNavBar';
import BenchmarkPage from 'pages/BenchmarkPage/BenchmarkPage';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { getViewComponentToViewId } from 'utils/viewMetaInfoHandlers';

const DefaultAppView = ({
  loadInitialState,
  currentViewID: currentViewId,
  showSideMenu,
}: DefaultAppProps): JSX.Element => {
  useEffect(loadInitialState, [loadInitialState]);
  const page = (
    <IonPage id="mainViewContentId">
      {React.createElement(getViewComponentToViewId(currentViewId))}
    </IonPage>
  );
  return (
    <IonApp>
      <TopNavBar />
      <div style={{ position: 'relative', flexGrow: 1 }}>
        {showSideMenu ? (
          <IonSplitPane
            when="lg"
            contentId="mainViewContentId"
            class="split-pane-fixed"
          >
            <BenchmarkSelector contentId="mainViewContentId" />
            {/* Page Content */}
            <IonPage id="mainViewContentId">
              <BenchmarkPage />
            </IonPage>
          </IonSplitPane>
        ) : (
          page
        )}
      </div>
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

export default DefaultAppView;
