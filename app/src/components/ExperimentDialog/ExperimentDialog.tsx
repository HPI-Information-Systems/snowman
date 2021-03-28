import 'components/ExperimentDialog/ExperimentDialogStyles.css';

import ExperimentDialogView from 'components/ExperimentDialog/ExperimentDialog.View';
import {
  ExperimentDialogDispatchProps,
  ExperimentDialogStateProps,
} from 'components/ExperimentDialog/ExperimentDialogProps';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  addOrUpdateExperiment,
  changeExperimentDescription,
  changeExperimentName,
  changeFileFormat,
  changeSelectedFiles,
  changeSoftKPITimeToConfigure,
  clickOnMatchingSolutionTag,
  closeDialog,
} from 'store/actions/ExperimentDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { DialogTypes } from 'types/DialogTypes';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { convertFilesListToFilesArray } from 'utils/filesConverter';
import { parseInputToNumberOrUndef } from 'utils/questionHelpers';

const isValidExperimentDialog = (state: Store): boolean => {
  if (
    state.ExperimentDialogStore.experimentName.length < 1 ||
    state.ExperimentDialogStore.selectedTags.length !== 1
  )
    return false;
  return !(
    state.ExperimentDialogStore.dialogType === DialogTypes.ADD_DIALOG &&
    state.ExperimentDialogStore.selectedFiles.length === 0
  );
};

const mapStateToProps = (state: Store): ExperimentDialogStateProps => ({
  isOpen: state.ExperimentDialogStore.isOpen,
  isAddDialog: state.ExperimentDialogStore.experimentId === null,
  experimentName: state.ExperimentDialogStore.experimentName,
  experimentDescription: state.ExperimentDialogStore.experimentDescription,
  tags: state.CoreStore.algorithms.map(
    (anAlgorithm: Algorithm): string => anAlgorithm.name
  ),
  selectedTags: state.ExperimentDialogStore.selectedTags,
  isValidForm: isValidExperimentDialog(state),
  selectedFiles: state.ExperimentDialogStore.selectedFiles,
  experimentFileFormat: state.ExperimentDialogStore.experimentFileFormat,
  timeToConfigure: state.ExperimentDialogStore.timeToConfigure,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentDialogDispatchProps => ({
  closeDialog: (): void => dispatch(closeDialog()),
  clickOnCancel: (): void => dispatch(closeDialog()),
  changeExperimentName: (event: IonChangeEvent): void =>
    dispatch(changeExperimentName(event.detail.value as string)),
  changeExperimentDescription: (event: IonChangeEvent): void =>
    dispatch(changeExperimentDescription(event.detail.value as string)),
  changeExperimentFileFormat: (anOption: string): void =>
    dispatch(changeFileFormat(anOption as experimentFileFormatEnum)),
  clickOnMatchingSolutionTag: (aTag: string): void =>
    dispatch(clickOnMatchingSolutionTag(aTag)),
  changeTimeToConfigure(event: IonChangeEvent) {
    dispatch(
      changeSoftKPITimeToConfigure(
        parseInputToNumberOrUndef(event.detail.value)
      )
    );
  },
  clickOnSubmit: (): void => {
    dispatch(addOrUpdateExperiment()).then();
  },
  changeSelectedFiles: (event: ChangeEvent<HTMLInputElement>): void =>
    dispatch(
      changeSelectedFiles(convertFilesListToFilesArray(event.target.files))
    ),
});

const ExperimentDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentDialogView);

export default ExperimentDialog;
