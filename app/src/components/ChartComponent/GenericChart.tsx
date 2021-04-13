import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartType,
  DefaultDataPoint,
  registerables,
} from 'chart.js';
import { isEqual } from 'lodash';
import React, { Component } from 'react';

// See: https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
Chart.register(...registerables);

export default class GenericChart<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> extends Component<ChartConfiguration<TType, TData, TLabel>> {
  chartRef = React.createRef<HTMLCanvasElement>();
  chartInstance: Chart<TType, TData, TLabel> | undefined = undefined;

  componentDidMount(): void {
    this.draw();
  }

  componentDidUpdate(): void {
    if (this.chartInstance !== undefined) {
      this.chartInstance.destroy();
      this.draw();
    }
  }

  componentWillUnmount(): void {
    if (this.chartInstance !== undefined) {
      this.chartInstance.destroy();
    }
  }

  shouldComponentUpdate(
    nextProps: Readonly<ChartConfiguration<TType, TData, TLabel>>
  ): boolean {
    if (
      !isEqual(nextProps.type, this.props.type) ||
      !isEqual(nextProps.options, this.props.options) ||
      !isEqual(nextProps.plugins, this.props.plugins)
    ) {
      // Replace chart completely
      return true;
    }

    // Always update chart's data
    this.updateData(nextProps.data);
    return false;
  }

  render(): JSX.Element {
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    );
  }

  updateData(data: ChartData<TType, TData, TLabel>): void {
    if (this.chartInstance !== undefined) {
      this.chartInstance.data = data;
      this.chartInstance.update();
    }
  }

  draw(): void {
    if (this.chartRef.current !== null) {
      this.chartInstance = new Chart(this.chartRef.current, {
        type: this.props.type,
        data: this.props.data,
        options: this.props.options,
        plugins: this.props.plugins,
      });
    }
  }
}
