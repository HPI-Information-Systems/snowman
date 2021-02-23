import 'components/AddExperimentDialog/AddExperimentDialogStyles.css';

import {
  AddExperimentDialogDispatchProps,
  AddExperimentDialogStateProps,
} from 'components/AddExperimentDialog/AddExperimentDialogProps';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  addNewExperiment,
  changeExperimentDescription,
  changeExperimentName,
  changeFileFormat,
  changeSelectedFiles,
  clickOnMatchingSolutionTag,
  closeDialog,
} from 'store/actions/AddExperimentDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

import AddExperimentDialogView from './AddExperimentDialog.View';

const mapStateToProps = (state: Store): AddExperimentDialogStateProps => ({
  isOpen: state.AddExperimentDialogStore.isOpen,
  experimentName: state.AddExperimentDialogStore.experimentName,
  experimentDescription: state.AddExperimentDialogStore.experimentDescription,
  tags: state.AlgorithmsStore.algorithms.map(
    (anAlgorithm: Algorithm): string => anAlgorithm.name
  ),
  selectedTags: state.AddExperimentDialogStore.selectedTags,
  isValidForm:
    state.AddExperimentDialogStore.experimentName.length > 0 &&
    state.AddExperimentDialogStore.selectedTags.length === 1 &&
    state.AddExperimentDialogStore.selectedFiles.length > 0,
  selectedFiles: state.AddExperimentDialogStore.selectedFiles,
  experimentFileFormat: state.AddExperimentDialogStore.experimentFileFormat,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddExperimentDialogDispatchProps => ({
  closeDialog: (): void => dispatch(closeDialog()),
  clickOnCancel: (): void => dispatch(closeDialog()),
  changeExperimentName: (event: IonChangeEvent): void =>
    dispatch(changeExperimentName(event.detail.value as string)),
  changeExperimentDescription: (event: IonChangeEvent): void =>
    dispatch(changeExperimentDescription(event.detail.value as string)),
  changeExperimentFileFormat: (event: IonChangeEvent): void =>
    dispatch(changeFileFormat(event.detail.value as experimentFileFormatEnum)),
  clickOnMatchingSolutionTag: (aTag: string): void =>
    dispatch(clickOnMatchingSolutionTag(aTag)),
  addExperiment: (): void => {
    dispatch(addNewExperiment()).then();
  },
  changeSelectedFiles: (event: ChangeEvent<HTMLInputElement>): void =>
    dispatch(
      changeSelectedFiles(convertFilesListToFilesArray(event.target.files))
    ),
});

const AddExperimentDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperimentDialogView);

export default AddExperimentDialog;
