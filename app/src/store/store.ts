import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'store/messages';
import { Store as IStore } from 'store/models';
import { rootReducer } from 'store/reducers/rootReducer';

const composeEnhancer = composeWithDevTools({
  name: 'MainStore',
});

export const store: Store<IStore, SnowmanAction> = createStore(
  rootReducer as Reducer<IStore, SnowmanAction>,
  composeEnhancer(applyMiddleware(thunk))
);
