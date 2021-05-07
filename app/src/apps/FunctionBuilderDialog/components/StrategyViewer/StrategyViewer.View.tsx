import {
  StrategyMap,
  StrategyMapItem,
} from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMap';
import styles from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperStyles.module.css';
import StrategySelector from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelector';
import StrategyUnselector from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector';
import {
  StrategyViewerOwnStateProps,
  StrategyViewerProps,
} from 'apps/FunctionBuilderDialog/components/StrategyViewer/StrategyViewerProps';
import React, { Component, createElement } from 'react';

class StrategyViewerView extends Component<
  StrategyViewerProps,
  StrategyViewerOwnStateProps
> {
  componentDidUpdate(prevProps: Readonly<StrategyViewerProps>): void {
    if (prevProps.strategyType !== this.props.strategyType) {
      this.setState({
        ...this.state,
        targetStrategy: StrategyMap.find(
          (aStrategyMapItem: StrategyMapItem): boolean =>
            aStrategyMapItem.targetStrategyKey === this.props.strategyType
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
              <StrategyUnselector blockAccessKey={this.props.blockAccessKey} />
            </span>
          </>
        ) : (
          <StrategySelector blockAccessKey={this.props.blockAccessKey} />
        )}
      </>
    );
  }
}

export default StrategyViewerView;
