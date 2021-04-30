import { ChartConfiguration, ChartData } from 'chart.js';
import GenericChart from 'components/simple/ChartComponent/GenericChart';
import React from 'react';

export type RadarChartConfiguration = Omit<ChartConfiguration<'radar'>, 'type'>;
export type RadarChartData = ChartData<'radar'>;
export const RadarChart = (props: RadarChartConfiguration): JSX.Element => (
  <GenericChart {...props} type={'radar'} />
);
