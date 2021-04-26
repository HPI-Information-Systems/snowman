import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

interface GenericProps {
  [key: string]: never;
}

const storeLink = function (
  store: Store<unknown, SnowmanAction>,
  AComponent: React.FC
): (props: GenericProps) => JSX.Element {
  // eslint-disable-next-line react/display-name
  return (props: GenericProps): JSX.Element => (
    <Provider store={store}>
      <AComponent {...props} />
    </Provider>
  );
};

export default storeLink;
