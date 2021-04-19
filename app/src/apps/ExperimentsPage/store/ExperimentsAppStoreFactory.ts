import ExperimentsAppReducer from 'apps/ExperimentsPage/store/ExperimentsAppReducer';
import { ExperimentsAppModel } from 'apps/ExperimentsPage/types/ExperimentsAppModel';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

const composeEnhancer = composeWithDevTools({
  name: 'ExperimentsAppStore',
});

export const createExperimentsAppStore = (): Store<
  ExperimentsAppModel,
  SnowmanAction
> =>
  createStore(
    ExperimentsAppReducer as Reducer<ExperimentsAppModel, SnowmanAction>,
    composeEnhancer(applyMiddleware(thunk))
  );
