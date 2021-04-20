import BenchmarkAppContainer from 'apps/BenchmarkApp/BenchmarkApp.Container';
import BenchmarkSelector from 'apps/BenchmarkApp/components/BenchmarkSelector/BenchmarkSelector';
import { createBenchmarkAppStore } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import GenericSubApp from 'components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const BenchmarkApp = (): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.DASHBOARD}
    appTitle={'Benchmark Dashboard'}
    createSubAppStore={createBenchmarkAppStore}
    sideMenu={BenchmarkSelector}
  >
    <BenchmarkAppContainer />
  </GenericSubApp>
);

export default BenchmarkApp;
