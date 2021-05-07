import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { GroupInputOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInputProps';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { selectId } from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import React from 'react';
import { Provider } from 'react-redux';

const GroupInput = ({ cacheKey }: GroupInputOwnProps): JSX.Element => {
  const [, autoIncrements, ...cacheKeys] = cacheKey;
  return (
    <SelectorPopoverGroup
      instanceDescriptor={useInstanceDescriptor()}
      items={[]}
    >
      <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
        {(cacheKeys as StoreCacheKey[]).map((cacheKey, index) => {
          for (const id of autoIncrements) {
            cacheKey = selectId(cacheKey, id) ?? cacheKey;
          }
          return (
            <AtomicSelectorGroup
              key={index}
              cacheKey={cacheKey}
              allowMultiple={false}
            />
          );
        })}
      </Provider>
    </SelectorPopoverGroup>
  );
};

export default GroupInput;
