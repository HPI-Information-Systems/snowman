import { GenericBenchmarkStrategyProps } from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategyProps';
import { isEqual } from 'lodash';
import { Component } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';

class GenericBenchmarkStrategyView extends Component<GenericBenchmarkStrategyProps> {
  store: Store<unknown, SnowmanAction>;

  constructor(props: GenericBenchmarkStrategyProps) {
    super(props);
    this.store = props.createStrategyStore();
  }

  componentDidUpdate(prevProps: Readonly<GenericBenchmarkStrategyProps>): void {
    if (this.props.loadStrategyData) {
      if (
        (prevProps.activeStrategy !== this.props.strategyId &&
          this.props.activeStrategy === this.props.strategyId) ||
        (this.props.activeStrategy === this.props.strategyId &&
          !isEqual(prevProps.benchmarkConfig, this.props.benchmarkConfig))
      ) {
        // If (strategy became active just now) or (is active and has properties updated)
        this.props.loadStrategyData(
          this.store.dispatch,
          this.props.benchmarkConfig
        );
      }
    }
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        {this.props.activeStrategy === this.props.strategyId
          ? this.props.children
          : null}
      </Provider>
    );
  }
}

export default GenericBenchmarkStrategyView;
