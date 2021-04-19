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

import { IonApp } from '@ionic/react';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import TapBar from 'components/TabBar/TapBar';
import BenchmarkApp from 'pages/BenchmarkPage/BenchmarkApp';
import RootPage from 'pages/RootPage/RootPage';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const SnowmanAppContainer = (): JSX.Element => {
  return (
    <IonApp>
      <TapBar />
      <RootPage />
      <BenchmarkApp />
      <ReactTooltip className="tooltip-fixed" html={true} place={'bottom'} />
      <GlobalLoading />
      {/* Todo: Change autoClose back to 5000 */}
      <ToastContainer
        autoClose={500}
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

export default SnowmanAppContainer;
