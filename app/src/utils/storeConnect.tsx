import React from 'react';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  Provider,
} from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';

const storeConnect = (
  store: Store<unknown, SnowmanAction>,
  mapStateToProps: MapStateToPropsParam<unknown, unknown, never>,
  mapDispatchToProps: MapDispatchToPropsParam<unknown, unknown>
) => (component: (...props: any[]) => JSX.Element): (() => JSX.Element) => {
  const HigherOrderComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
  // eslint-disable-next-line react/display-name
  return (...props: unknown[]): JSX.Element => (
    <Provider store={store}>
      <HigherOrderComponent {...props} />
    </Provider>
  );
};

export default storeConnect;
