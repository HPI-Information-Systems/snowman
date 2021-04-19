import BenchmarkAppReducer from 'pages/BenchmarkPage/store/BenchmarkAppReducer';
import { BenchmarkAppModel } from 'pages/BenchmarkPage/types/BenchmarkAppModel';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { SnowmanAction } from 'store/messages';

const composeEnhancer = composeWithDevTools({
  name: 'BenchmarkAppStore',
});

export const createBenchmarkAppStore = (): Store<
  BenchmarkAppModel,
  SnowmanAction
> =>
  createStore(
    BenchmarkAppReducer as Reducer<BenchmarkAppModel, SnowmanAction>,
    composeEnhancer(applyMiddleware(thunk))
  );
