import { StrategyMapperProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import StrategyViewer from 'apps/FunctionBuilderDialog/components/StrategyViewer/StrategyViewer';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { CellDescriptor } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React, { Component } from 'react';

class StrategyMapper extends Component<StrategyMapperProps> {
  blockMagistrate: FunctionBuildingBlockMagistrate;
  blockAccessKey: number;

  constructor(props: StrategyMapperProps) {
    super(props);
    this.blockMagistrate = new FunctionBuildingBlockMagistrate();
    this.blockAccessKey = this.blockMagistrate.getNewAccessKey();
    this.blockMagistrate.registerBuildingBlock(
      this.blockAccessKey,
      this.props.parentAccessKey,
      this.props.ownLocation ?? CellDescriptor.left
    );
  }

  componentWillUnmount(): void {
    this.blockMagistrate.unregisterBuildingBlock(this.blockAccessKey);
  }

  render(): JSX.Element {
    return <StrategyViewer blockAccessKey={this.blockAccessKey} />;
  }
}

export default StrategyMapper;
