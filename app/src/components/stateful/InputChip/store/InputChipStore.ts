import InputChipReducer from 'components/stateful/InputChip/store/InputChipReducer';
import { InputChipModel } from 'components/stateful/InputChip/types/InputChipModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

const inputChipStores = new Map<string, Store<InputChipModel, SnowmanAction>>();

const undefID = 'undef';

export const getInputChipStore = (
  instanceDescriptor?: string
): Store<InputChipModel, SnowmanAction> => {
  const existingStore = inputChipStores.get(instanceDescriptor ?? undefID);
  const resultingStore =
    existingStore ??
    constructStore(
      `InputChipStore - ${instanceDescriptor ? instanceDescriptor : 'UNDEF'}`,
      InputChipReducer
    );
  inputChipStores.set(instanceDescriptor ?? undefID, resultingStore);
  return resultingStore;
};
