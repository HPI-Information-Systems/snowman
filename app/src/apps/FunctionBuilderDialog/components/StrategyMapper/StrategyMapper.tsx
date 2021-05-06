import NextStrategySelector from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelector';
import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  StrategyMapperProps,
  StrategyMapperStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import { getNewAccessKey } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import React, { Component, createElement } from 'react';

class StrategyMapper extends Component<
  StrategyMapperProps,
  StrategyMapperStateProps
> {
  blockAccessKey: number;
  constructor(props: StrategyMapperProps) {
    super(props);
    this.blockAccessKey = this.props.blockAccessKey ?? getNewAccessKey();
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

  render(): JSX.Element {
    return (
      <>
        {this.state?.targetStrategy !== undefined ? (
          <span style={{ marginLeft: 10, marginRight: 10 }}>
            {createElement(this.state.targetStrategy.targetStrategyComponent)}
            <StrategyUnselector
              nextStrategyType={this.props.nextStrategyType}
              setNextStrategyType={this.props.setNextStrategyType}
            />
          </span>
        ) : (
          <span style={{ marginLeft: 10, marginRight: 10 }}>
            <NextStrategySelector
              nextStrategyType={this.props.nextStrategyType}
              setNextStrategyType={this.props.setNextStrategyType}
            />
          </span>
        )}
      </>
    );
  }
}

export default StrategyMapper;
