import { ChartConfiguration } from 'chart.js';
import GenericChart from 'components/ChartComponent/GenericChart';
import React from 'react';

export type RadarChartConfiguration = Omit<ChartConfiguration<'radar'>, 'type'>;
export const RadarChart = (props: RadarChartConfiguration): JSX.Element => (
  <GenericChart {...props} type={'radar'} />
);
