import { KpiInvestigatorStrategyProps } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategyProps';
import { ScatterChart } from 'components/simple/ChartComponent/ScatterChart';
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
    <ScatterChart
      data={{
        datasets: [
          {
            label: 'exp1',
            backgroundColor: 'cyan',
            data: [
              { x: 3, y: 2 },
              { x: 6, y: 3 },
              { x: 10, y: 5 },
              { x: 15, y: 8 },
              { x: 18, y: 8 },
            ],
          },
          {
            label: 'exp2',
            backgroundColor: 'purple',
            data: [
              { x: 5, y: 5 },
              { x: 7, y: 2 },
              { x: 9, y: 6 },
              { x: 13, y: 9 },
              { x: 16, y: 9 },
            ],
          },
        ],
      }}
    />
  </>
);

export default KpiInvestigatorStrategyView;
