import FunctionBuilderDialogView from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.View';
import {
  FunctionBuilderDialogDispatchProps,
  FunctionBuilderDialogStateProps,
} from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import {
  changeFunctionName,
  createSimilarityThresholdFunction,
} from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: FunctionBuilderDialogModel
): FunctionBuilderDialogStateProps => ({
  functionName: state.functionName,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
): FunctionBuilderDialogDispatchProps => ({
  clickOnCancel() {
    doCloseDialog();
  },
  clickOnAddOrUpdate() {
    dispatch(createSimilarityThresholdFunction());
  },
  changeFunctionName(newName: string) {
    dispatch(changeFunctionName(newName));
  },
});

const FunctionBuilderDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FunctionBuilderDialogView);

export default FunctionBuilderDialogContainer;
