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
/* Include katex styling */
import 'katex/dist/katex.min.css';
/* Include toast styling */
import 'react-toastify/dist/ReactToastify.css';
/* Overwrite variables */
import 'theme/overwrites.css';

import { IonApp } from '@ionic/react';
import AboutApp from 'apps/AboutApp/AboutApp';
import AlgorithmDialog from 'apps/AlgorithmDialog/AlgorithmDialog';
import AlgorithmsApp from 'apps/AlgorithmsApp/AlgorithmsApp';
import BenchmarkApp from 'apps/BenchmarkApp/BenchmarkApp';
import DatasetDialog from 'apps/DatasetDialog/DatasetDialog';
import DatasetsApp from 'apps/DatasetsApp/DatasetsApp';
import DataViewerApp from 'apps/DataViewerApp/DataViewerApp';
import ExperimentDialog from 'apps/ExperimentDialog/ExperimentDialog';
import ExperimentsApp from 'apps/ExperimentsApp/ExperimentsApp';
import FunctionBuilderDialog from 'apps/FunctionBuilderDialog/FunctionBuilderDialog';
import PreviewDialog from 'apps/PreviewDialog/PreviewDialog';
import SimilarityFuncsDialog from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialog';
import BlockingLoading from 'apps/SnowmanApp/components/BlockingLoading/BlockingLoading';
import TabBar from 'apps/SnowmanApp/components/TabBar/TabBar';
import { SnowmanAppProps } from 'apps/SnowmanApp/SnowmanAppProps';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const SnowmanAppView = ({
  refreshCentralResources,
  resources,
}: SnowmanAppProps): JSX.Element => {
  useEffect(refreshCentralResources, [refreshCentralResources]);
  return (
    <IonApp>
      <TabBar />
      <AboutApp />
      <DataViewerApp />
      <BenchmarkApp />
      <AlgorithmsApp algorithms={resources.algorithms} />
      <DatasetsApp datasets={resources.datasets} />
      <ExperimentsApp resources={resources} />
      <AlgorithmDialog />
      <DatasetDialog />
      <ExperimentDialog />
      <PreviewDialog />
      <SimilarityFuncsDialog />
      <FunctionBuilderDialog />
      <ReactTooltip
        className="tooltip-fixed"
        id="tooltip"
        html={false}
        place={'bottom'}
      />
      <ReactTooltip
        className="tooltip-fixed"
        id="tooltipAllowHtml"
        html={true}
        place={'bottom'}
      />
      <BlockingLoading />
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

export default SnowmanAppView;
