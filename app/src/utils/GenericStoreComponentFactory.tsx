import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StoreMagistrate } from 'utils/storeFactory';

export interface GenericStoreComponentProps {
  instanceDescriptor: string;
}

const GenericStoreComponentFactory = function <
  Model,
  OwnProps extends GenericStoreComponentProps
>(
  magistrate: StoreMagistrate<Model>,
  component: React.FC<OwnProps>
): typeof Component {
  return class GenericStoreComponent extends Component<OwnProps> {
    render(): JSX.Element {
      return (
        <Provider store={magistrate.getStore(this.props.instanceDescriptor)}>
          {React.createElement(component, this.props)}
        </Provider>
      );
    }
  };
};

export default GenericStoreComponentFactory;
