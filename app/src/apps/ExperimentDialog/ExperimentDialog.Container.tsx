import ExperimentDialogView from 'apps/ExperimentDialog/ExperimentDialog.View';
import {
  ExperimentDialogDispatchProps,
  ExperimentDialogOwnProps,
  ExperimentDialogStateProps,
} from 'apps/ExperimentDialog/ExperimentDialogProps';
import {
  addOrUpdateExperiment,
  changeAlgorithm,
  changeDataset,
  changeExperimentDescription,
  changeExperimentName,
  changeExpertise,
  changeFileFormat,
  changeHRAmount,
  changeSelectedFiles,
} from 'apps/ExperimentDialog/store/ExperimentDialogActions';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import {
  IonChangeEvent,
  IonRangeChangeEvent,
  IonSelectChangeEvent,
} from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { convertFilesListToFilesArray } from 'utils/filesConverter';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const isValidExperimentDialog = (
  state: ExperimentDialogModel,
  isAddDialog = false
): boolean => {
  if (
    state.experimentName.length < 1 ||
    state.selectedDataset === undefined ||
    state.selectedAlgorithm === undefined
  )
    return false;
  return !(isAddDialog && state.selectedFiles.length === 0);
};

const mapStateToProps = (
  state: ExperimentDialogModel,
  ownProps: ExperimentDialogOwnProps
): ExperimentDialogStateProps => ({
  isAddDialog: ownProps.isAddDialog,
  experimentName: state.experimentName,
  experimentDescription: state.experimentDescription,
  isValidForm: isValidExperimentDialog(state, ownProps.isAddDialog),
  selectedFiles: state.selectedFiles,
  experimentFileFormat: state.experimentFileFormat,
  datasets: state.datasets,
  selectedDataset: state.selectedDataset?.toString() ?? '',
  algorithms: state.algorithms,
  selectedAlgorithm: state.selectedAlgorithm?.toString() ?? '',
  expertise: state.expertise,
  hrAmount: state.hrAmount,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<ExperimentDialogModel>,
  ownProps: ExperimentDialogOwnProps
): ExperimentDialogDispatchProps => ({
  clickOnCancel: (): void => doCloseDialog(),
  changeExperimentName: (event: IonChangeEvent): void =>
    dispatch(changeExperimentName(event.detail.value as string)),
  changeExperimentDescription: (event: IonChangeEvent): void =>
    dispatch(changeExperimentDescription(event.detail.value as string)),
  changeExperimentFileFormat: (anOption: string): void =>
    dispatch(changeFileFormat(anOption as experimentFileFormatEnum)),
  changeDataset(event: IonSelectChangeEvent) {
    dispatch(
      changeDataset(parseInputToNumberOrUndef(event.detail.value as string))
    );
  },
  changeAlgorithm(event: IonSelectChangeEvent) {
    dispatch(
      changeAlgorithm(parseInputToNumberOrUndef(event.detail.value as string))
    );
  },
  clickOnSubmit: (): void => {
    dispatch(addOrUpdateExperiment(ownProps.entityId)).then();
  },
  changeSelectedFiles: (event: ChangeEvent<HTMLInputElement>): void =>
    dispatch(
      changeSelectedFiles(convertFilesListToFilesArray(event.target.files))
    ),
  changeExpertise: (event: IonRangeChangeEvent) =>
    dispatch(changeExpertise(event.detail.value as number)),
  changeHRAmount: (event: IonChangeEvent) =>
    dispatch(changeHRAmount(parseFloat(event.detail.value as string))),
});

const ExperimentDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentDialogView);

export default ExperimentDialogContainer;
