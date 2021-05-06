import NextStrategySelector from 'apps/FunctionBuilderDialog/components/NextStrategySelector/NextStrategySelector';
import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import {
  StrategyMapperProps,
  StrategyMapperStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import styles from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperStyles.module.css';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import React, { Component, createElement } from 'react';

class StrategyMapper extends Component<
  StrategyMapperProps,
  StrategyMapperStateProps
> {
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
          <>
            {createElement(this.state.targetStrategy.targetStrategyComponent)}
            <span className={styles.unselectorMargin}>
              <StrategyUnselector
                nextStrategyType={this.props.nextStrategyType}
                setNextStrategyType={this.props.setNextStrategyType}
              />
            </span>
          </>
        ) : (
          <NextStrategySelector
            nextStrategyType={this.props.nextStrategyType}
            setNextStrategyType={this.props.setNextStrategyType}
          />
        )}
      </>
    );
  }
}

export default StrategyMapper;
