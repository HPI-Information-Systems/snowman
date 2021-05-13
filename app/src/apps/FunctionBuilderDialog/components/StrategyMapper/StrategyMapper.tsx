import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { StrategyMap } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  StrategyMapperForwardProps,
  StrategyMapperProps,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperStyles.module.css';
import StrategySelector from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelector';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import React, { Component, createElement, FC } from 'react';
import { useSelector } from 'react-redux';

const StrategyViewer = ({
  blockAccessKey,
}: StrategyMapperForwardProps): JSX.Element => {
  const targetStrategy = useSelector((state: FunctionBuilderDialogModel):
    | FC<StrategyMapperForwardProps>
    | undefined => {
    const strategyType: FunctionBuildingBlockType =
      state.functionBuildingStack.getBlock(blockAccessKey)?.type ??
      UndefinedStrategy;
    return StrategyMap.get(strategyType);
  });

  return (
    <>
      {targetStrategy !== undefined ? (
        <>
          {createElement(targetStrategy, {
            blockAccessKey: blockAccessKey,
          })}
          <span className={styles.unselectorMargin}>
            <StrategyUnselector blockAccessKey={blockAccessKey} />
          </span>
        </>
      ) : (
        <StrategySelector blockAccessKey={blockAccessKey} />
      )}
    </>
  );
};

class StrategyMapper extends Component<StrategyMapperProps> {
  blockAccessKey: number;

  constructor(props: StrategyMapperProps) {
    super(props);
    if (
      this.props.ownLocation !== undefined &&
      this.props.parentAccessKey !== null &&
      FunctionBuildingBlockMagistrate.doesAnBlockAlreadyExists(
        this.props.parentAccessKey,
        this.props.ownLocation
      )
    ) {
      this.blockAccessKey = FunctionBuildingBlockMagistrate.getAccessKeyOfExistingChildBlock(
        this.props.parentAccessKey,
        this.props.ownLocation
      );
    } else {
      this.blockAccessKey =
        this.props.parentAccessKey !== null
          ? FunctionBuildingBlockMagistrate.getNewAccessKey()
          : RootAccessKey;
      FunctionBuildingBlockMagistrate.registerBuildingBlock(
        this.blockAccessKey,
        this.props.parentAccessKey,
        this.props.ownLocation ?? CellDescriptor.left
      );
    }
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
