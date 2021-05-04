import { GenericStoreComponentProps } from 'components/generics/GenericStoreComponent/GenericStoreComponentProps';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { StoreMagistrate } from 'utils/storeFactory';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const GenericStoreComponentFactory = function <
  Model,
  OwnProps extends GenericStoreComponentProps
>(magistrate: StoreMagistrate<Model>, component: React.FC<OwnProps>) {
  return class GenericStoreComponent extends Component<OwnProps> {
    store: Store<Model, SnowmanAction> | null = null;

    UNSAFE_componentWillMount(): void {
      this.store = magistrate.getStore(this.props.instanceDescriptor);
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
          {React.createElement(component, this.props)}
        </Provider>
      );
    }
  };
};

export default GenericStoreComponentFactory;
