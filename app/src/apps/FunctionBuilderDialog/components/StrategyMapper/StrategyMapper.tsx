import NextStrategySelector from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelector';
import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  chooseStrategyFunction,
  StrategyMapperProps,
  StrategyMapperStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperStyles.module.css';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import React, { Component, createElement } from 'react';

class StrategyMapper extends Component<
  StrategyMapperProps,
  StrategyMapperStateProps
> {
  blockMagistrate: FunctionBuildingBlockMagistrate;
  blockAccessKey: number;
  setStrategy: chooseStrategyFunction;

  constructor(props: StrategyMapperProps) {
    super(props);
    this.blockMagistrate = new FunctionBuildingBlockMagistrate();
    this.blockAccessKey = this.blockMagistrate.getNewAccessKey();
    this.blockMagistrate.registerBuildingBlock(
      this.blockAccessKey,
      this.props.parentAccessKey,
      this.props.ownLocation ?? CellDescriptor.left
    );
    this.setStrategy = (strategy: FunctionBuildingBlockType): void =>
      this.blockMagistrate.chooseStrategy(this.blockAccessKey, strategy);
  }

  componentDidUpdate(prevProps: Readonly<StrategyMapperProps>): void {
    if (prevProps.nextStrategyType !== this.props.nextStrategyType) {
      this.setState({
        ...this.state,
        targetStrategy: StrategyMap.find(
          (aStrategyMapItem: StrategyMapItem): boolean =>
            aStrategyMapItem.targetStrategyKey === this.props.nextStrategyType
        ),
      });
    }
  }

  componentWillUnmount(): void {
    this.blockMagistrate.unregisterBuildingBlock(this.blockAccessKey);
  }

  render(): JSX.Element {
    return (
      <>
        {this.state?.targetStrategy !== undefined ? (
          <>
            {createElement(this.state.targetStrategy.targetStrategyComponent)}
            <span className={styles.unselectorMargin}>
              <StrategyUnselector
                nextStrategyType={this.props.nextStrategyType}
                setNextStrategyType={this.setStrategy}
              />
            </span>
          </>
        ) : (
          <NextStrategySelector
            nextStrategyType={this.props.nextStrategyType}
            setNextStrategyType={this.setStrategy}
          />
        )}
      </>
    );
  }
}

export default StrategyMapper;
