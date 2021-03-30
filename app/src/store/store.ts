import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'store/messages';
import { Store as IStore } from 'store/models';
import { rootReducer } from 'store/reducers/rootReducer';

const composeEnhancer = composeWithDevTools({
  name: 'IonChipStore',
});

export const store: Store<IStore> = createStore(
  rootReducer as Reducer<IStore, SnowmanAction>,
  composeEnhancer(applyMiddleware(thunk))
);
