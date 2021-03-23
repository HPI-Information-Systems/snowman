import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'store/messages';
import { Store as IStore } from 'store/models';
import { rootReducer } from 'store/reducers/rootReducer';

const composeEnhancer =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

export const store: Store<IStore> = createStore(
  rootReducer as Reducer<IStore, SnowmanAction>,
  composeEnhancer(applyMiddleware(thunk))
);
