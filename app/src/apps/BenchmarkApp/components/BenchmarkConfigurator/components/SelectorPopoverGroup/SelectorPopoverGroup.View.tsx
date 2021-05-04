import SelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroup';
import { SelectorPopoverGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import React from 'react';

const SelectorPopoverGroupView = (
  props: SelectorPopoverGroupProps
): JSX.Element => <SelectorGroup {...props}></SelectorGroup>;

export default SelectorPopoverGroupView;
