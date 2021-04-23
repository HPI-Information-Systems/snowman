import { GenericBenchmarkStrategyProps } from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategyProps';
import { Component } from 'react';
import React from 'react';
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
      <>
        {this.props.activeStrategy === this.props.strategyId
          ? this.props.children
          : null}
      </>
    );
  }
}

export default GenericBenchmarkStrategyView;
