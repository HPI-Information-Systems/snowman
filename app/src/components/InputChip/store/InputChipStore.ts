import InputChipReducer from 'components/InputChip/store/InputChipReducer';
import { InputChipModel } from 'components/InputChip/types/InputChipModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const createInputChipStore = (
  instanceDescriptor?: string
): Store<InputChipModel, SnowmanAction> =>
  constructStore(
    `InputChipStore - ${instanceDescriptor ? instanceDescriptor : 'UNDEF'}`,
    InputChipReducer
  );
