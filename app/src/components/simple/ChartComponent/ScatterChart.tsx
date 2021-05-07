import { ChartConfiguration, ChartData } from 'chart.js';
import GenericChart from 'components/simple/ChartComponent/GenericChart';
import React from 'react';

export type ScatterChartConfiguration = Omit<
  ChartConfiguration<'scatter'>,
  'type'
>;
export type ScatterChartData = ChartData<'scatter'>;
export type ScatterChartDatasets = ScatterChartData['datasets'];
export type ScatterChartDataset = ScatterChartDatasets[0];

export const ScatterChart = (props: ScatterChartConfiguration): JSX.Element => {
  const genericProps: ChartConfiguration = {
    ...props,
    type: 'scatter',
  } as ChartConfiguration;

  return <GenericChart {...genericProps} />;
};
