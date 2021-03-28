import {
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from 'api';
import AlgorithmDialogView from 'components/AlgorithmDialog/AlgorithmDialog.View';
import {
  AlgorithmDialogDispatchProps,
  AlgorithmDialogStateProps,
} from 'components/AlgorithmDialog/AlgorithmDialogProps';
import { connect } from 'react-redux';
import {
  addOrUpdateAlgorithm,
  changeAlgorithmDescription,
  changeAlgorithmName,
  changeSoftKPIImplementationKnowHowLevel,
  changeSoftKPIMatchingSolutionType,
  changeSoftKPITimeToConfigure,
  changeSoftKPITimeToInstall,
  closeDialog,
} from 'store/actions/AlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const mapStateToProps = (state: Store): AlgorithmDialogStateProps => ({
  isAddDialog: state.AlgorithmDialogStore.algorithmId === null,
  isOpen: state.AlgorithmDialogStore.isOpen,
  algorithmDescription: state.AlgorithmDialogStore.algorithmDescription,
  algorithmName: state.AlgorithmDialogStore.algorithmName,
  implementationKnowHowLevel:
    state.AlgorithmDialogStore.implementationKnowHowLevel,
  matchingSolutionType: state.AlgorithmDialogStore.matchingSolutionType,
  timeToInstall: state.AlgorithmDialogStore.timeToInstall,
  timeToConfigure: state.AlgorithmDialogStore.timeToConfigure,
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
  changeImplementationKnowHowLevel(event: IonChangeEvent): void {
    dispatch(
      changeSoftKPIImplementationKnowHowLevel(
        event.detail.value === undefined
          ? undefined
          : (event.detail
              .value as AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum)
      )
    );
  },
  changeMatchingSolutionType(event: IonChangeEvent): void {
    dispatch(
      changeSoftKPIMatchingSolutionType(
        event.detail.value as AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum
      )
    );
  },
  changeTimeToConfigure(event: IonChangeEvent): void {
    dispatch(
      changeSoftKPITimeToConfigure(
        parseInputToNumberOrUndef(event.detail.value)
      )
    );
  },
  changeTimeToInstall(event: IonChangeEvent): void {
    dispatch(
      changeSoftKPITimeToInstall(parseInputToNumberOrUndef(event.detail.value))
    );
  },
  clickOnSubmit(): void {
    dispatch(addOrUpdateAlgorithm()).then();
  },
});

const AlgorithmDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmDialogView);

export default AlgorithmDialog;
