import StrategySelectorView from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelector.View';
import {
  StrategySelectorDispatchProps,
  StrategySelectorOwnProps,
  StrategySelectorStateProps,
} from 'apps/FunctionBuilderDialog/components/StrategySelector/StrategySelectorProps';
import { FunctionBuildingBlockMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: FunctionBuilderDialogModel,
  ownProps: StrategySelectorOwnProps
): StrategySelectorStateProps => ({
  chosenStrategyType:
    state.functionBuildingStack.getBlock(ownProps.blockAccessKey)?.type ??
    UndefinedStrategy,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>,
  ownProps: StrategySelectorOwnProps
): StrategySelectorDispatchProps => ({
  setStrategyType(strategyType: FunctionBuildingBlockType) {
    dispatch(
      FunctionBuildingBlockMagistrate.chooseStrategyAction(
        ownProps.blockAccessKey,
        strategyType
      )
    );
  },
});

const StrategySelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(StrategySelectorView);

export default StrategySelector;
