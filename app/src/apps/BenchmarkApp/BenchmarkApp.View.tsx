import { BenchmarkAppProps } from 'apps/BenchmarkApp/BenchmarkAppProps';
import DashboardStrategy from 'apps/BenchmarkApp/strategies/DashboardStrategy/DashboardStrategy';
import NMetricsStrategy from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy';
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
      <NMetricsStrategy />
    </PageStruct>
  );
};

export default BenchmarkAppView;
