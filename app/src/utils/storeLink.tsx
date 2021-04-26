import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

const storeLink = function (
  store: Store<unknown, SnowmanAction>,
  AComponent: FC
): (props: Record<string, unknown>) => JSX.Element {
  // eslint-disable-next-line react/display-name
  return (props: Record<string, unknown>): JSX.Element => (
    <Provider store={store}>
      <AComponent {...props} />
    </Provider>
  );
};

export default storeLink;
