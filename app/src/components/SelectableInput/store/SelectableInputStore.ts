import { SelectableInputReducer } from 'components/SelectableInput/store/SelectableInputReducer';
import { SelectableInputModel } from 'components/SelectableInput/types/SelectableInputModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { constructStore } from 'utils/storeFactory';

export const createSelectableInputStore = (
  instanceDescriptor?: string
): Store<SelectableInputModel, SnowmanAction> =>
  constructStore(
    `SelectableInput - ${instanceDescriptor ? instanceDescriptor : 'UNDEF'}`,
    SelectableInputReducer
  );
