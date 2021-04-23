import { BenchmarkAppProps } from 'apps/BenchmarkApp/BenchmarkAppProps';
import DashboardStrategy from 'apps/BenchmarkApp/strategies/DashboardStrategy/DashboardStrategy';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import React, { useEffect } from 'react';

const BenchmarkAppView = ({
  loadInitialState,
  activeStrategy,
}: BenchmarkAppProps): JSX.Element => {
  useEffect(loadInitialState, [loadInitialState]);
  return (
    <PageStruct pageTitle={activeStrategy}>
      <DashboardStrategy />
    </PageStruct>
  );
};

export default BenchmarkAppView;
