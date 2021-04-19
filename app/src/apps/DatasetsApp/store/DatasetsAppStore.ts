import DatasetsAppReducer from 'apps/DatasetsApp/store/DatasetsAppReducer';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'store/messages';

const composeEnhancer = composeWithDevTools({
  name: 'DatasetsAppStore',
});

export const createDatasetsAppStore = (): Store<
  DatasetsAppModel,
  SnowmanAction
> =>
  createStore(
    DatasetsAppReducer as Reducer<DatasetsAppModel, SnowmanAction>,
    composeEnhancer(applyMiddleware(thunk))
  );
