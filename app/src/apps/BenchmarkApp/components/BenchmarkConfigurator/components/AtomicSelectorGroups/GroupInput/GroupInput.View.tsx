import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { GroupInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInputProps';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';

const GroupInputView = ({
  cacheKeys,
  items,
  spreadItemsToParent,
  cacheKey,
}: GroupInputProps): JSX.Element => {
  const itemElements = useMemo(
    () =>
      cacheKeys.map(([cacheKey, heading], index) =>
        heading ? (
          <ConfiguratorItem
            key={index}
            title={heading}
            configurators={[[cacheKey, false]]}
          />
        ) : (
          <AtomicSelectorGroup
            key={index}
            cacheKey={cacheKey}
            allowMultiple={false}
          />
        )
      ),
    [cacheKeys]
  );

  return spreadItemsToParent ? (
    <>{itemElements}</>
  ) : (
    <SelectorPopoverGroup
      instanceDescriptor={serializeCacheKey(cacheKey)}
      items={items}
    >
      <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
        {itemElements}
      </Provider>
    </SelectorPopoverGroup>
  );
};

export default GroupInputView;
