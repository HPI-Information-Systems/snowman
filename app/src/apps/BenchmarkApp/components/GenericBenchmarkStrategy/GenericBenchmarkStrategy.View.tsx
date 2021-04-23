import { GenericBenchmarkStrategyProps } from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategyProps';
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
