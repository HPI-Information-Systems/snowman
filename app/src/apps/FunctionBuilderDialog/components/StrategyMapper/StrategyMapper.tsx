import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { StrategyMapperProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import StrategyViewer from 'apps/FunctionBuilderDialog/components/StrategyViewer/StrategyViewer';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React, { Component } from 'react';

class StrategyMapper extends Component<StrategyMapperProps> {
  blockAccessKey: number;

  constructor(props: StrategyMapperProps) {
    super(props);
    this.blockAccessKey = !this.props.parentAccessKey
      ? FunctionBuildingBlockMagistrate.getNewAccessKey()
      : RootAccessKey;
    FunctionBuildingBlockMagistrate.registerBuildingBlock(
      this.blockAccessKey,
      this.props.parentAccessKey,
      this.props.ownLocation ?? CellDescriptor.left
    );
  }

  componentWillUnmount(): void {
    FunctionBuildingBlockMagistrate.unregisterBuildingBlock(
      this.blockAccessKey
    );
  }

  render(): JSX.Element {
    return <StrategyViewer blockAccessKey={this.blockAccessKey} />;
  }
}

export default StrategyMapper;
