import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import React, { useState } from 'react';

export const AtomicSelectorGroup = ({
  cacheKey,
  ...props
}: AtomicSelectorGroupOwnProps): JSX.Element => {
  const { targetCache } = getCacheKeyAndFilter(cacheKey);
  const [SelectorGroup, setSelectorGroup] = useState<
    null | ((props: AtomicSelectorGroupOwnProps) => JSX.Element | null)
  >(null);
  let selectorGroupPromise: Promise<{
    default: (props: AtomicSelectorGroupOwnProps) => JSX.Element | null;
  }>;

  switch (targetCache) {
    case 'algorithms':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup'
      ) as typeof selectorGroupPromise;
      break;
    case 'datasets':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup'
      ) as typeof selectorGroupPromise;
      break;
    case 'experiments':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup'
      ) as typeof selectorGroupPromise;
      break;
    case 'simFunctions':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/SimFunctionSelectorGroup'
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
  selectorGroupPromise.then((SelectorGroup) => {
    setSelectorGroup(() => SelectorGroup.default);
  });

  return SelectorGroup ? (
    React.createElement(SelectorGroup, { ...props, cacheKey })
  ) : (
    <></>
  );
};
