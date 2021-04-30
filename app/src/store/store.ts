import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { ImmediateStore } from 'store/models';
import { rootReducer } from 'store/reducers/rootReducer';
import { SnowmanAction } from 'types/SnowmanAction';

const composeEnhancer = composeWithDevTools({
  name: 'MainStore',
});

export const store: Store<ImmediateStore, SnowmanAction> = createStore(
  rootReducer as Reducer<ImmediateStore, SnowmanAction>,
  composeEnhancer(applyMiddleware(thunk))
);
