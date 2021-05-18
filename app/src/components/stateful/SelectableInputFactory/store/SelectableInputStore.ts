import { SelectableInputReducer } from 'components/stateful/SelectableInputFactory/store/SelectableInputReducer';
import { SelectableInputModel } from 'components/stateful/SelectableInputFactory/types/SelectableInputModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SelectableInputStoreMagistrate: StoreMagistrate<SelectableInputModel> = new StoreMagistrate<SelectableInputModel>(
  'SelectableInput',
  SelectableInputReducer
);
