import {
  IonButton,
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { SetExperimentFileFormatEnum } from 'api';
import { AddExperimentDialogProps } from 'components/AddExperimentDialog/AddExperimentDialogProps';
import FileInput from 'components/FileInput/FileInput';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import { addCircleOutline, closeCircleOutline } from 'ionicons/icons';
import React from 'react';
import { $enum } from 'ts-enum-util';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

const AddExperimentDialogView = ({
  isOpen,
  closeDialog,
  clickOnCancel,
  experimentName,
  experimentDescription,
  experimentFileFormat,
  tags,
  selectedTags,
  changeExperimentDescription,
  changeExperimentName,
  changeExperimentFileFormat,
  clickOnMatchingSolutionTag,
  addExperiment,
  isValidForm,
  selectedFiles,
  changeSelectedFiles,
}: AddExperimentDialogProps): JSX.Element => (
  <ModalDialog
    heading={'Add New Experiment'}
    isOpen={isOpen}
    closeDialog={closeDialog}
  >
    <IonList>
      <IonItem>
        <IonLabel position="fixed">Name/ID:</IonLabel>
        <IonInput
          clearInput
          value={experimentName}
          onIonChange={changeExperimentName}
          placeholder="e.g. example-run1"
          minlength={1}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Description:</IonLabel>
        <IonTextarea
          value={experimentDescription}
          onIonChange={changeExperimentDescription}
          placeholder="e.g. Randomly assigned pairs for testing purposes."
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">File Format:</IonLabel>
        <IonSelect
          value={experimentFileFormat}
          multiple={false}
          onIonChange={changeExperimentFileFormat}
        >
          {$enum(experimentFileFormatEnum).map(
            (form: SetExperimentFileFormatEnum) => (
              <IonSelectOption key={'format-option-' + form} value={form}>
                {form}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Source File:</IonLabel>
        <FileInput
          selectedFiles={selectedFiles}
          onChange={changeSelectedFiles}
        />
      </IonItem>
    </IonList>
    <div className="center tag-view">
      {tags.map(
        (aTag: string): JSX.Element => (
          <IonChip
            color={selectedTags.includes(aTag) ? 'primary' : 'dark'}
            outline={false}
            key={aTag}
            onClick={(): void => clickOnMatchingSolutionTag(aTag)}
          >
            <IonLabel>{aTag}</IonLabel>
          </IonChip>
        )
      )}
    </div>
    <div className="center button-row">
      <IonButton
        className="button-hugh button-padding"
        onClick={addExperiment}
        disabled={!isValidForm}
      >
        <IonIcon slot="start" icon={addCircleOutline} />
        Add
      </IonButton>
      <IonButton
        className="button-hugh button-padding"
        onClick={clickOnCancel}
        color="light"
      >
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel
      </IonButton>
    </div>
  </ModalDialog>
);

export default AddExperimentDialogView;
