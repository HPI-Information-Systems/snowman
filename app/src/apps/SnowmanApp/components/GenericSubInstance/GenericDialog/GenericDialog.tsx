import GenericDialogView from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog.View';
import {
  GenericDialogDispatchProps,
  GenericDialogOwnProps,
  GenericDialogStateProps,
} from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogProps';
import { closeDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SnowmanAppModel,
  ownProps: GenericDialogOwnProps
): GenericDialogStateProps => ({
  isDialogOpen: state.RenderLogicStore.openedDialog === ownProps.instanceId,
  entityId: state.RenderLogicStore.entityId,
  entityType: state.RenderLogicStore.entityType,
  isAddDialog: !state.RenderLogicStore.entityId,
  centralResources: state.CentralResourcesStore,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>,
  ownProps: GenericDialogOwnProps
): GenericDialogDispatchProps => ({
  closeDialog() {
    dispatch(closeDialog(ownProps.instanceId));
  },
});

const GenericDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericDialogView);

export default GenericDialog;
