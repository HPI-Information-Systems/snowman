import FunctionBuilderDialogView from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.View';
import {
  FunctionBuilderDialogDispatchProps,
  FunctionBuilderDialogStateProps,
} from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import { createSimilarityThresholdFunction } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogActions';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: FunctionBuilderDialogModel
): FunctionBuilderDialogStateProps => ({
  operator: state.operator,
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
});

const FunctionBuilderDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FunctionBuilderDialogView);

export default FunctionBuilderDialogContainer;
