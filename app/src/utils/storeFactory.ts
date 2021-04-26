import autoBind from 'auto-bind';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

type StoreInstanceDescriptor = string;

export class StoreMagistrate<StoreModel> {
  static defaultID = 'Default';

  poolName: string;
  reducer: Reducer<StoreModel, SnowmanAction>;
  pool: Map<string, Store<StoreModel, SnowmanAction>>;

  constructor(poolName: string, reducer: Reducer<StoreModel, SnowmanAction>) {
    this.pool = new Map<string, Store<StoreModel, SnowmanAction>>();
    this.poolName = poolName;
    this.reducer = reducer;

    autoBind(this);
  }

  deleteStore(instanceDescriptor?: StoreInstanceDescriptor): boolean {
    return this.pool.delete(instanceDescriptor ?? StoreMagistrate.defaultID);
  }

  private constructNewStore(
    instanceDescriptor: StoreInstanceDescriptor
  ): Store<StoreModel, SnowmanAction> {
    const composeEnhancer = composeWithDevTools({
      name: `${this.poolName}-${instanceDescriptor}`,
    });
    const newStore = createStore(
      this.reducer,
      composeEnhancer(applyMiddleware(thunk))
    );
    this.pool.set(instanceDescriptor, newStore);
    return newStore;
  }

  getStore(
    instanceDescriptor?: StoreInstanceDescriptor
  ): Store<StoreModel, SnowmanAction> {
    const usedInstanceDescriptor: StoreInstanceDescriptor =
      instanceDescriptor ?? StoreMagistrate.defaultID;
    return (
      this.pool.get(usedInstanceDescriptor) ??
      this.constructNewStore(usedInstanceDescriptor)
    );
  }
}

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
