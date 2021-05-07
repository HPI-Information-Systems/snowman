import { ChartConfiguration, ChartData } from 'chart.js';
import GenericChart from 'components/simple/ChartComponent/GenericChart';
import React from 'react';

export type LineChartConfiguration = Omit<ChartConfiguration<'line'>, 'type'>;
export type LineChartData = ChartData<'line'>;
export const LineChart = (props: LineChartConfiguration): JSX.Element => {
  const genericProps: ChartConfiguration = {
    ...props,
    type: 'line',
  } as ChartConfiguration;

  return <GenericChart {...genericProps} />;
};
