import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  StrategyMapperProps,
  StrategyMapperStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperStyles.module.css';
import StrategySelector from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelector';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import React, { Component, createElement } from 'react';

class StrategyMapper extends Component<
  StrategyMapperProps,
  StrategyMapperStateProps
> {
  blockAccessKey: number;
  storeUnsubscription: () => void;

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

    this.storeUnsubscription = FunctionBuilderDialogMagistrate.getStore().subscribe(
      (): void => {
        const newState: FunctionBuilderDialogModel = FunctionBuilderDialogMagistrate.getStore().getState();
        const strategyType: FunctionBuildingBlockType =
          newState.functionBuildingStack.getBlock(this.blockAccessKey)?.type ??
          UndefinedStrategy;
        this.setState({
          ...this.state,
          targetStrategy: StrategyMap.find(
            (aStrategyMapItem: StrategyMapItem): boolean =>
              aStrategyMapItem.targetStrategyKey === strategyType
          ),
        });
      }
    );
  }

  componentWillUnmount(): void {
    FunctionBuildingBlockMagistrate.unregisterBuildingBlock(
      this.blockAccessKey
    );
    this.storeUnsubscription();
  }

  render(): JSX.Element {
    return (
      <>
        {this.state?.targetStrategy !== undefined ? (
          <>
            {createElement(this.state.targetStrategy.targetStrategyComponent, {
              blockAccessKey: this.blockAccessKey,
            })}
            <span className={styles.unselectorMargin}>
              <StrategyUnselector blockAccessKey={this.blockAccessKey} />
            </span>
          </>
        ) : (
          <StrategySelector blockAccessKey={this.blockAccessKey} />
        )}
      </>
    );
  }
}

export default StrategyMapper;
