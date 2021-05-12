import BenchmarkAppContainer from 'apps/BenchmarkApp/BenchmarkApp.Container';
import BenchmarkConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfigurator';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import GenericSubApp from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp';
import React from 'react';
import { ViewIDs } from 'types/ViewIDs';

const BenchmarkApp = (): JSX.Element => (
  <GenericSubApp
    instanceId={ViewIDs.BenchmarkApp}
    appTitle={'Benchmark Dashboard'}
    createSubAppStore={BenchmarkAppStoreMagistrate.getStore}
    sideMenu={BenchmarkConfigurator}
    usePageStruct={false}
  >
    <BenchmarkAppContainer />
  </GenericSubApp>
);

export default BenchmarkApp;
