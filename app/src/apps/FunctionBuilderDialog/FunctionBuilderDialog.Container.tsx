import FunctionBuilderDialogView from 'apps/FunctionBuilderDialog/FunctionBuilderDialog.View';
import { FunctionBuilderDialogDispatchProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import { doReturnToPreviousDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (): FunctionBuilderDialogDispatchProps => ({
  clickOnCancel() {
    doReturnToPreviousDialog();
  },
});

const FunctionBuilderDialogContainer = connect(
  null,
  mapDispatchToProps
)(FunctionBuilderDialogView);

export default FunctionBuilderDialogContainer;
