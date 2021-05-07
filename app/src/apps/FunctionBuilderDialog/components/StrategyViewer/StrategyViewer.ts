import StrategyViewerView from 'apps/FunctionBuilderDialog/components/StrategyViewer/StrategyViewer.View';
import {
  StrategyViewerOwnProps,
  StrategyViewerStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyViewer/StrategyViewerProps';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: FunctionBuilderDialogModel,
  ownProps: StrategyViewerOwnProps
): StrategyViewerStateProps => ({
  strategyType:
    state.functionBuildingStack.getBlock(ownProps.blockAccessKey)?.type ??
    UndefinedStrategy,
});

const StrategyViewer = connect(mapStateToProps)(StrategyViewerView);

export default StrategyViewer;
