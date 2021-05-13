import InputChipReducer from 'components/stateful/InputChip/store/InputChipReducer';
import { InputChipModel } from 'components/stateful/InputChip/types/InputChipModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const InputChipStoreMagistrate: StoreMagistrate<InputChipModel> = new StoreMagistrate<InputChipModel>(
  'InputChipStore',
  InputChipReducer
);
