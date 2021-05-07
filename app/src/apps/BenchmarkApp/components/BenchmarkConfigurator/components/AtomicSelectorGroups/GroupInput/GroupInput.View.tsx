import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { GroupInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInputProps';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import React from 'react';
import { Provider } from 'react-redux';

const GroupInputView = ({ cacheKeys, items }: GroupInputProps): JSX.Element => {
  return (
    <SelectorPopoverGroup
      instanceDescriptor={useInstanceDescriptor()}
      items={items}
    >
      <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
        {cacheKeys.map((cacheKey, index) => (
          <AtomicSelectorGroup
            key={index}
            cacheKey={cacheKey}
            allowMultiple={false}
          />
        ))}
      </Provider>
    </SelectorPopoverGroup>
  );
};

export default GroupInputView;
