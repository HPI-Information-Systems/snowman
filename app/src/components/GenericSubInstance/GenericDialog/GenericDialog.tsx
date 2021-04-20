import { closeDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import GenericDialogView from 'components/GenericSubInstance/GenericDialog/GenericDialog.View';
import {
  GenericDialogDispatchProps,
  GenericDialogOwnProps,
  GenericDialogStateProps,
} from 'components/GenericSubInstance/GenericDialog/GenericDialogProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SnowmanAppModel,
  ownProps: GenericDialogOwnProps
): GenericDialogStateProps => ({
  isDialogOpen: state.RenderLogicStore.openedDialog === ownProps.instanceId,
  entityId: state.RenderLogicStore.entityId,
  isAddDialog: !state.RenderLogicStore.entityId,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): GenericDialogDispatchProps => ({
  closeDialog() {
    dispatch(closeDialog());
  },
});

const GenericDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericDialogView);

export default GenericDialog;
