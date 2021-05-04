import SelectorPopoverGroupContainer from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup.Container';
import { SelectorPopoverGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import { SelectorPopoverGroupStoreMagistrate } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/store/SelectorPopoverGroupStore';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

class SelectorPopoverGroup extends Component<SelectorPopoverGroupOwnProps> {
  store: Store<SelectorPopoverGroupModel, SnowmanAction> | null = null;

  UNSAFE_componentWillMount(): void {
    this.store = SelectorPopoverGroupStoreMagistrate.getStore(
      this.props.instanceDescriptor
    );
  }

  componentWillUnmount(): void {
    this.store = null;
  }

  render(): JSX.Element {
    if (this.store === null) {
      return <div />;
    }
    return (
      <Provider store={this.store}>
        <SelectorPopoverGroupContainer {...this.props} />
      </Provider>
    );
  }
}

export default SelectorPopoverGroup;
