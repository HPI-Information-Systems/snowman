import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import AlgorithmDialogView from 'components/AlgorithmDialog/AlgorithmDialog.View';
import {
  AlgorithmDialogDispatchProps,
  AlgorithmDialogOwnProps,
  AlgorithmDialogStateProps,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import {
  changeAlgorithmDescription,
  changeAlgorithmName,
} from 'components/AlgorithmDialog/store/AlgorithmDialogActions';
import { AlgorithmDialogModel } from 'components/AlgorithmDialog/types/AlgorithmDialogModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: AlgorithmDialogModel,
  ownProps: AlgorithmDialogOwnProps
): AlgorithmDialogStateProps => ({
  isAddDialog: ownProps.algorithmId === null,
  algorithmDescription: state.algorithmDescription,
  algorithmName: state.algorithmName,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<AlgorithmDialogModel>
): AlgorithmDialogDispatchProps => ({
  clickOnCancel(): void {
    doCloseDialog();
  },
  closeDialog(): void {
    doCloseDialog();
  },
  changeAlgorithmName(event: IonChangeEvent): void {
    dispatch(changeAlgorithmName(event.detail.value as string));
  },
  changeAlgorithmDescription(event: IonChangeEvent): void {
    dispatch(changeAlgorithmDescription(event.detail.value as string));
  },
  clickOnSubmit(): void {
    console.log();
  },
});

const AlgorithmDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialogContainer;
