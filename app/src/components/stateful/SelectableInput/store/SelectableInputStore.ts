import { SelectableInputReducer } from 'components/stateful/SelectableInput/store/SelectableInputReducer';
import { SelectableInputModel } from 'components/stateful/SelectableInput/types/SelectableInputModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SelectableInputStoreMagistrate: StoreMagistrate<SelectableInputModel> = new StoreMagistrate<SelectableInputModel>(
  'Selectable Input',
  SelectableInputReducer
);
