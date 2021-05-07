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
      );
      break;
    case 'datasets':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup'
      );
      break;
    case 'experiments':
      selectorGroupPromise = import(
        'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup'
      );
      break;
    case 'multiSelects':
    //TODO
    //   SelectorGroup = MultiSelectSelectorGroup;
    //   break;
    case 'simFunctions':
    //   SelectorGroup = SimFunctionSelectorGroup;
    //   break;
    case 'simThresholds':
    //   SelectorGroup = SimThresholdSelectorGroup;
    //   break;
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
