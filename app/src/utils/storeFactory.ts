import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

export const constructStore = <Model>(
  storeName: string,
  reducer: Reducer<Model, SnowmanAction>
): Store<Model, SnowmanAction> => {
  const composeEnhancer = composeWithDevTools({
    name: storeName,
  });
  return createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
};

const dummyReducer = (_: null | undefined, __: SnowmanAction): null => null;

export const dummyStoreFactory = (
  storeName: string
): (() => Store<unknown, SnowmanAction>) => (): Store<unknown, SnowmanAction> =>
  constructStore<null>(storeName, dummyReducer);
