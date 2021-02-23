import AddAlgorithmDialogView from 'components/AddAlgorithmDialog/AddAlgorithmDialog.View';
import {
  AddAlgorithmDialogDispatchProps,
  AddAlgorithmDialogStateProps,
} from 'components/AddAlgorithmDialog/AddAlgorithmDialogProps';
import { connect } from 'react-redux';
import {
  addAlgorithm,
  changeAlgorithmDescription,
  changeAlgorithmName,
  closeDialog,
} from 'store/actions/AddAlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: Store): AddAlgorithmDialogStateProps => ({
  isOpen: state.AddAlgorithmDialogStore.isOpen,
  algorithmDescription: state.AddAlgorithmDialogStore.algorithmDescription,
  algorithmName: state.AddAlgorithmDialogStore.algorithmName,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddAlgorithmDialogDispatchProps => ({
  clickOnCancel: (): void => dispatch(closeDialog()),
  closeDialog: (): void => dispatch(closeDialog()),
  changeAlgorithmName: (event: IonChangeEvent): void =>
    dispatch(changeAlgorithmName(event.detail.value as string)),
  changeAlgorithmDescription: (event: IonChangeEvent): void =>
    dispatch(changeAlgorithmDescription(event.detail.value as string)),
  clickOnAdd(): void {
    dispatch(addAlgorithm()).then();
  },
});

const AddAlgorithmDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAlgorithmDialogView);

export default AddAlgorithmDialog;
