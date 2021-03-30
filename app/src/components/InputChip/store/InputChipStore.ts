import InputChipReducer from 'components/InputChip/store/InputChipReducer';
import {
  InputChipAction,
  InputChipStore,
} from 'components/InputChip/store/models';
import { applyMiddleware, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

const composeEnhancer = composeWithDevTools({
  name: 'IonChipStore',
});

export const store: Store<InputChipStore, InputChipAction> = createStore(
  InputChipReducer as Reducer<InputChipStore, InputChipAction>,
  composeEnhancer(applyMiddleware(thunk))
);
