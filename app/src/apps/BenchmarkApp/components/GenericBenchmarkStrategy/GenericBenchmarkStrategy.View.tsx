import { GenericBenchmarkStrategyProps } from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategyProps';
import { isEqual } from 'lodash';
import { Component } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

class GenericBenchmarkStrategyView extends Component<GenericBenchmarkStrategyProps> {
  store: Store<unknown, SnowmanAction>;

  constructor(props: GenericBenchmarkStrategyProps) {
    super(props);
    this.store = props.createStrategyStore();
  }

  componentDidMount(): void {
    if (
      this.props.loadStrategyData &&
      this.props.activeStrategy === this.props.strategyId
    ) {
      this.props.loadStrategyData(this.store.dispatch, this.props.appStore);
    }
  }

  componentDidUpdate(prevProps: Readonly<GenericBenchmarkStrategyProps>): void {
    if (
      this.props.loadStrategyData &&
      this.props.activeStrategy === this.props.strategyId
    ) {
      const strategyJustBecameActive =
        prevProps.activeStrategy !== this.props.strategyId;
      const propertiesUpdated = !isEqual(
        prevProps.appStore,
        this.props.appStore
      );
      if (strategyJustBecameActive || propertiesUpdated) {
        this.props.loadStrategyData(this.store.dispatch, this.props.appStore);
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
