import { KpiInvestigatorStrategyProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { LineChart } from 'components/simple/ChartComponent/LineChart';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React from 'react';

const KpiInvestigatorStrategyView = ({
  isValidConfig,
}: KpiInvestigatorStrategyProps): JSX.Element => (
  <>
    <ErroneousBackdrop
      shouldShow={!isValidConfig}
      message={'Please select at least a one diagram track!'}
    />
    <LineChart
      data={{ datasets: [{ data: [1, 2, 3] }], labels: ['1', '2', '3'] }}
    />
  </>
);

export default KpiInvestigatorStrategyView;
