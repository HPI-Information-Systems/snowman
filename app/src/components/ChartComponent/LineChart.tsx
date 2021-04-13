import { ChartConfiguration } from 'chart.js';
import GenericChart from 'components/ChartComponent/GenericChart';
import React from 'react';

export type LineChartConfiguration = Omit<ChartConfiguration<'line'>, 'type'>;
export const LineChart = (props: LineChartConfiguration): JSX.Element => (
  <GenericChart {...props} type={'line'} />
);
