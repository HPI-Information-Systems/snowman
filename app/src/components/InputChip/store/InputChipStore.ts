import InputChipReducer from 'components/InputChip/store/InputChipReducer';
import {
  InputChipAction,
  InputChipStore,
} from 'components/InputChip/store/models';
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'IonChipStore' }) ||
  compose();

export const store: Store<InputChipStore> = createStore(
  InputChipReducer as Reducer<InputChipStore, InputChipAction>,
  composeEnhancer(applyMiddleware(thunk))
);
