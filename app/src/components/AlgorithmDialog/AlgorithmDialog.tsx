import AlgorithmDialogView from 'components/AlgorithmDialog/AlgorithmDialog.View';
import {
  AlgorithmDialogDispatchProps,
  AlgorithmDialogStateProps,
  AlgorithmSoftKPIsTypesEnum,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import { connect } from 'react-redux';
import {
  addOrUpdateAlgorithm,
  changeAlgorithmDescription,
  changeAlgorithmName,
  changeAlgorithmSoftKPIs,
  closeDialog,
} from 'store/actions/AlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { IonChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (state: Store): AlgorithmDialogStateProps => ({
  isAddDialog: state.AlgorithmDialogStore.algorithmId === null,
  isOpen: state.AlgorithmDialogStore.isOpen,
  algorithmDescription: state.AlgorithmDialogStore.algorithmDescription,
  algorithmName: state.AlgorithmDialogStore.algorithmName,
  algorithmId: state.AlgorithmDialogStore.algorithmId ?? MagicNotPossibleId,
  algorithmSoftKPIs: state.AlgorithmDialogStore.algorithmSoftKPIs,
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
  changeAlgorithmSoftKPIs(
    type: AlgorithmSoftKPIsTypesEnum,
    event: IonChangeEvent
  ) {
    dispatch(changeAlgorithmSoftKPIs(type, event.detail.value));
  },
});

const AlgorithmDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialog;
