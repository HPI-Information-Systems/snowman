import StrategyUnselectorView from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselector.View';
import {
  StrategyUnselectorDispatchProps,
  StrategyUnselectorOwnProps,
  StrategyUnselectorStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: FunctionBuilderDialogModel,
  ownProps: StrategyUnselectorOwnProps
): StrategyUnselectorStateProps => ({
  isStrategySelected:
    state.functionBuildingStack.getBlock(ownProps.blockAccessKey)?.type !==
      UndefinedStrategy ?? false,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>,
  ownProps: StrategyUnselectorOwnProps
): StrategyUnselectorDispatchProps => ({
  unselectStrategy() {
    dispatch(
      FunctionBuildingBlockMagistrate.chooseStrategyAction(
        ownProps.blockAccessKey,
        UndefinedStrategy
      )
    );
  },
});

const StrategyUnselector = connect(
  mapStateToProps,
  mapDispatchToProps
)(StrategyUnselectorView);

export default StrategyUnselector;
