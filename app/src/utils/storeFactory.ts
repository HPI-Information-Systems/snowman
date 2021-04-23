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

export class PooledStoreFactory<StoreModel> {
  static undefID = 'undef';
  storePool: Map<string, Store<StoreModel, SnowmanAction>>;
  storeBaseName: string;
  reducer: Reducer<StoreModel, SnowmanAction>;

  constructor(
    storeBaseName: string,
    reducer: Reducer<StoreModel, SnowmanAction>
  ) {
    this.storePool = new Map<string, Store<StoreModel, SnowmanAction>>();
    this.storeBaseName = storeBaseName;
    this.reducer = reducer;
  }

  getStore(instanceDescriptor?: string): Store<StoreModel, SnowmanAction> {
    const existingStore = this.storePool.get(
      instanceDescriptor ?? PooledStoreFactory.undefID
    );
    const resultingStore =
      existingStore ??
      constructStore(
        `${this.storeBaseName} - ${
          instanceDescriptor ?? PooledStoreFactory.undefID
        }`,
        this.reducer
      );
    this.storePool.set(
      instanceDescriptor ?? PooledStoreFactory.undefID,
      resultingStore
    );
    return resultingStore;
  }
}
