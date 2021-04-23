import { SelectableInputReducer } from 'components/stateful/SelectableInput/store/SelectableInputReducer';
import { SelectableInputModel } from 'components/stateful/SelectableInput/types/SelectableInputModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { PooledStoreFactory } from 'utils/storeFactory';

const pooledSelectableInputStoreFactory: PooledStoreFactory<SelectableInputModel> = new PooledStoreFactory<SelectableInputModel>(
  'Selectable Input',
  SelectableInputReducer
);

export const createSelectableInputStore = (
  instanceDescriptor?: string
): Store<SelectableInputModel, SnowmanAction> =>
  pooledSelectableInputStoreFactory.getStore(instanceDescriptor);
