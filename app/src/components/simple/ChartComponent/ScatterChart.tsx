import { ChartConfiguration } from 'chart.js';
import GenericChart from 'components/simple/ChartComponent/GenericChart';
import React from 'react';

export type ScatterChartConfiguration = Omit<
  ChartConfiguration<'scatter'>,
  'type'
>;
export const ScatterChart = (props: ScatterChartConfiguration): JSX.Element => (
  <GenericChart {...props} type={'scatter'} />
);
