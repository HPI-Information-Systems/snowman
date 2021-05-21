import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { AtomicSelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import React, { useState } from 'react';

export const AtomicSelectorGroup = ({
  cacheKey,
  ...props
}: AtomicSelectorGroupProps): JSX.Element => {
  const { targetCache } = getCacheKeyAndFilter(cacheKey);
  const [SelectorGroup, setSelectorGroup] = useState<
    null | ((props: AtomicSelectorGroupProps) => JSX.Element | null)
  >(null);
  let selectorGroupPromise: Promise<{
    default: (props: AtomicSelectorGroupProps) => JSX.Element | null;
  }>;
  if (cacheKey[0] === StoreCacheKeyBaseEnum.group) {
    selectorGroupPromise = (import(
      'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInput'
    ) as unknown) as typeof selectorGroupPromise;
  } else {
    switch (targetCache) {
      case 'algorithms':
      case 'datasets':
      case 'experiments':
      case 'simFunctions':
        selectorGroupPromise = import(
          'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/EntityInput/EntityInput'
        ) as typeof selectorGroupPromise;
        break;
      case 'simThresholds':
        selectorGroupPromise = import(
          'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInput'
        ) as typeof selectorGroupPromise;
        break;
      case 'multiSelects':
        selectorGroupPromise = import(
          'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelector'
        ) as typeof selectorGroupPromise;
        break;
      default:
        throw new Error('Unknown atomic selector group');
    }
  }
  selectorGroupPromise.then((SelectorGroup) => {
    setSelectorGroup(() => SelectorGroup.default);
  });

  return SelectorGroup ? (
    React.createElement(SelectorGroup, { ...props, cacheKey })
  ) : (
    <></>
  );
};
