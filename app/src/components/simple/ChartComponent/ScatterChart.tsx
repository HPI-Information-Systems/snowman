import { ChartConfiguration } from 'chart.js';
import GenericChart from 'components/simple/ChartComponent/GenericChart';
import React from 'react';

export type ScatterChartConfiguration = Omit<
  ChartConfiguration<'scatter'>,
  'type'
>;

export const ScatterChart = (props: ScatterChartConfiguration): JSX.Element => {
  const genericProps: ChartConfiguration = {
    ...props,
    type: 'scatter',
  } as ChartConfiguration;

  return <GenericChart {...genericProps} />;
};
