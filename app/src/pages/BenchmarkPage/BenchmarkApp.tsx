import GenericSubApp from 'components/GenericSubApp/GenericSubApp';
import BenchmarkAppContainer from 'pages/BenchmarkPage/BenchmarkApp.Container';
import BenchmarkSelector from 'pages/BenchmarkPage/components/BenchmarkSelector/BenchmarkSelector';
import { createBenchmarkAppStore } from 'pages/BenchmarkPage/store/BenchmarkAppStoreFactory';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const BenchmarkApp = (): JSX.Element => (
  <GenericSubApp
    appId={ViewIDs.DASHBOARD}
    appTitle={'Benchmark Dashboard'}
    createSubAppStore={createBenchmarkAppStore}
    sideMenu={BenchmarkSelector}
  >
    <BenchmarkAppContainer />
  </GenericSubApp>
);

export default BenchmarkApp;
