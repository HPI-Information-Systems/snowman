import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

const storeLink = function (
  store: Store<unknown, SnowmanAction>,
  AComponent: FC
): (props: Record<string, unknown>) => JSX.Element {
  // This variable is _not_ to be inlined!
  const StoreProviderComponent = (
    props: Record<string, unknown>
  ): JSX.Element => (
    <Provider store={store}>
      <AComponent {...props} />
    </Provider>
  );
  return StoreProviderComponent;
};

export default storeLink;
