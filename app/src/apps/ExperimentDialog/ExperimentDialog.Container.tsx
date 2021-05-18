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
  changeRuntime,
  changeSelectedFiles,
  toggleSegmentExpansion,
} from 'apps/ExperimentDialog/store/ExperimentDialogActions';
import { ExperimentDialogModel } from 'apps/ExperimentDialog/types/ExperimentDialogModel';
import { ExperimentSegmentTypeEnum } from 'apps/ExperimentDialog/types/ExperimentSegmentTypeEnum';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent, IonRangeChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

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
  selectedDataset: state.selectedDataset,
  algorithms: state.algorithms,
  selectedAlgorithm: state.selectedAlgorithm,
  expertise: state.expertise,
  hrAmount: state.hrAmount,
  runtime: state.runtime,
  expandedSegments: state.expandedSegments,
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
  changeDataset(dataset: number | undefined) {
    dispatch(changeDataset(dataset));
  },
  changeAlgorithm(algorithm: number | undefined) {
    dispatch(changeAlgorithm(algorithm));
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
  changeRuntime: (event: IonChangeEvent) =>
    dispatch(changeRuntime(parseFloat(event.detail.value as string))),
  toggleSegmentExpansion(aSegment: ExperimentSegmentTypeEnum) {
    dispatch(toggleSegmentExpansion(aSegment));
  },
});

const ExperimentDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentDialogView);

export default ExperimentDialogContainer;
