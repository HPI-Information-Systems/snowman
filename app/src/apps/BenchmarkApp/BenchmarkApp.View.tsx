import { BenchmarkAppProps } from 'apps/BenchmarkApp/BenchmarkAppProps';
import BinaryMetricsStrategy from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategy';
import DashboardStrategy from 'apps/BenchmarkApp/strategies/DashboardStrategy/DashboardStrategy';
import IntersectionStrategy from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategy';
import KpiInvestigatorStrategy from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy';
import NMetricsStrategy from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import BackFab from 'components/simple/GenericFab/BackFab';
import React, { useEffect } from 'react';

const BenchmarkAppView = ({
  loadInitialState,
  activeStrategy,
  openStrategy,
}: BenchmarkAppProps): JSX.Element => {
  useEffect(loadInitialState, [loadInitialState]);
  return (
    <PageStruct pageTitle={activeStrategy}>
      <DashboardStrategy openStrategy={openStrategy} />
      <NMetricsStrategy />
      <IntersectionStrategy />
      <BinaryMetricsStrategy />
      <KpiInvestigatorStrategy />
      {activeStrategy !== StrategyIDs.Dashboard ? (
        <BackFab clickOnFab={(): void => openStrategy(StrategyIDs.Dashboard)} />
      ) : (
        <div />
      )}
    </PageStruct>
  );
};

export default BenchmarkAppView;
