import FunctionBuilderDialogView from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.View';
import { FunctionBuilderDialogDispatchProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (): FunctionBuilderDialogDispatchProps => ({
  clickOnCancel() {
    doCloseDialog();
  },
});

const FunctionBuilderDialogContainer = connect(
  null,
  mapDispatchToProps
)(FunctionBuilderDialogView);

export default FunctionBuilderDialogContainer;
