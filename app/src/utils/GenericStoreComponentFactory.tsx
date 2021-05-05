import React from 'react';
import { Provider } from 'react-redux';
import { StoreMagistrate } from 'utils/storeFactory';

export interface GenericStoreComponentProps {
  instanceDescriptor?: string;
}

const GenericStoreComponentFactory = function <
  Model,
  OwnProps extends GenericStoreComponentProps
>(
  magistrate: StoreMagistrate<Model>,
  component: React.FC<OwnProps>
): (props: OwnProps) => JSX.Element {
  // This variable is _not_ to be inlined!
  const GenericStoreComponent = (props: OwnProps): JSX.Element => (
    <Provider store={magistrate.getStore(props.instanceDescriptor)}>
      {React.createElement(component, props)}
    </Provider>
  );
  return GenericStoreComponent;
};

export default GenericStoreComponentFactory;
