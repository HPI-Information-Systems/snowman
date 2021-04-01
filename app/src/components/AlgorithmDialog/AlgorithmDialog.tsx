import AlgorithmDialogView from 'components/AlgorithmDialog/AlgorithmDialog.View';
import {
  AlgorithmDialogDispatchProps,
  AlgorithmDialogStateProps,
  SoftKPIsGeneralTypesEnum,
  SoftKPIsInstallationTypesEnum,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import { connect } from 'react-redux';
import {
  addOrUpdateAlgorithm,
  changeAlgorithmDescription,
  changeAlgorithmName,
  closeDialog,
  updateSoftKPIsGeneral,
  updateSoftKPIsInstallation,
} from 'store/actions/AlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: Store): AlgorithmDialogStateProps => ({
  isAddDialog: state.AlgorithmDialogStore.algorithmId === null,
  isOpen: state.AlgorithmDialogStore.isOpen,
  algorithmDescription: state.AlgorithmDialogStore.algorithmDescription,
  algorithmName: state.AlgorithmDialogStore.algorithmName,
  softKPIsGeneral: state.AlgorithmDialogStore.softKPIsGeneral,
  softKPIsInstallation: state.AlgorithmDialogStore.softKPIsInstallation,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AlgorithmDialogDispatchProps => ({
  clickOnCancel(): void {
    dispatch(closeDialog());
  },
  closeDialog(): void {
    dispatch(closeDialog());
  },
  changeAlgorithmName(event: IonChangeEvent): void {
    dispatch(changeAlgorithmName(event.detail.value as string));
  },
  changeAlgorithmDescription(event: IonChangeEvent): void {
    dispatch(changeAlgorithmDescription(event.detail.value as string));
  },
  clickOnSubmit(): void {
    dispatch(addOrUpdateAlgorithm()).then();
  },
  changeSoftKPIsGeneral(
    event: IonChangeEvent,
    type: SoftKPIsGeneralTypesEnum
  ): void {
    console.log(type, event);
    dispatch(updateSoftKPIsGeneral(type, event.detail.value));
  },
  changeSoftKPIsInstallation(
    event: IonChangeEvent,
    type: SoftKPIsInstallationTypesEnum
  ): void {
    console.log(type, event);
    dispatch(updateSoftKPIsInstallation(type, event.detail.value));
  },
});

const AlgorithmDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialog;
