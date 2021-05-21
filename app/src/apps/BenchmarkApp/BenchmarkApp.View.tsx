import { BenchmarkAppProps } from 'apps/BenchmarkApp/BenchmarkAppProps';
import BinaryMetricsStrategy from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategy';
import DashboardStrategy from 'apps/BenchmarkApp/strategies/DashboardStrategy/DashboardStrategy';
import DecisionMatrixStrategy from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategy';
import IntersectionStrategy from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategy';
import KpiInvestigatorStrategy from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy';
import NMetricsStrategy from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy';
import SimilarityDiagramStrategy from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategy';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import HomeFab from 'components/simple/GenericFab/HomeFab';
import React from 'react';

const BenchmarkAppView = ({
  activeStrategy,
  openStrategy,
}: BenchmarkAppProps): JSX.Element => {
  return (
    <>
      <DashboardStrategy openStrategy={openStrategy} />
      <NMetricsStrategy />
      <IntersectionStrategy />
      <BinaryMetricsStrategy />
      <KpiInvestigatorStrategy />
      <SimilarityDiagramStrategy />
      <DecisionMatrixStrategy />
      {activeStrategy !== StrategyIDs.Dashboard ? (
        <HomeFab clickOnFab={(): void => openStrategy(StrategyIDs.Dashboard)} />
      ) : (
        <div />
      )}
    </>
  );
};

export default BenchmarkAppView;
