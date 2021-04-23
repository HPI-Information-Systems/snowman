import InputChipReducer from 'components/stateful/InputChip/store/InputChipReducer';
import { InputChipModel } from 'components/stateful/InputChip/types/InputChipModel';
import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { PooledStoreFactory } from 'utils/storeFactory';

const pooledInputChipStoreFactory = new PooledStoreFactory(
  'InputChipStore',
  InputChipReducer
);

export const getInputChipStore = (
  instanceDescriptor?: string
): Store<InputChipModel, SnowmanAction> =>
  pooledInputChipStoreFactory.getStore(instanceDescriptor);
