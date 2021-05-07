import { KpiInvestigatorStrategyProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React from 'react';

const KpiInvestigatorStrategyView = ({
  isValidConfig,
  datasets,
}: KpiInvestigatorStrategyProps): JSX.Element => (
  <>
    <ErroneousBackdrop
      shouldShow={!isValidConfig}
      message={'Please select at least a one diagram track!'}
    />
    <ScatterChart
      data={{
        datasets: datasets,
      }}
    />
  </>
);

export default KpiInvestigatorStrategyView;
