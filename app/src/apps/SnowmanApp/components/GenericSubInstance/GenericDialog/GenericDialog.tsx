import GenericDialogView from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialog.View';
import {
  GenericDialogDispatchProps,
  GenericDialogOwnProps,
  GenericDialogStateProps,
} from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogProps';
import { closeDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { head } from 'lodash';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SnowmanAppModel,
  ownProps: GenericDialogOwnProps
): GenericDialogStateProps => ({
  isDialogOpen:
    head(state.RenderLogicStore.dialogStack)?.dialogId === ownProps.instanceId,
  entityId: head(state.RenderLogicStore.dialogStack)?.entityId ?? null,
  entityType: head(state.RenderLogicStore.dialogStack)?.entityType ?? null,
  isAddDialog: !head(state.RenderLogicStore.dialogStack)?.entityId,
  centralResources: state.CentralResourcesStore,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>,
  ownProps: GenericDialogOwnProps
): GenericDialogDispatchProps => ({
  closeDialog() {
    dispatch(closeDialog(ownProps.instanceId, true));
  },
});

const GenericDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericDialogView);

export default GenericDialog;
