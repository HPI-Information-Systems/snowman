import SelectorPopoverGroupReducer from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/store/SelectorPopoverGroupReducer';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import { StoreMagistrate } from 'utils/storeFactory';

export const SelectorPopoverGroupStoreMagistrate = new StoreMagistrate<SelectorPopoverGroupModel>(
  'SelectorPopover Group',
  SelectorPopoverGroupReducer
);
