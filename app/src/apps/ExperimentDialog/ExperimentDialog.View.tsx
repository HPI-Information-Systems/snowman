import 'apps/ExperimentDialog/ExperimentDialogStyles.css';

import {
  IonButton,
  IonChip,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { ExperimentDialogProps } from 'apps/ExperimentDialog/ExperimentDialogProps';
import FileInput from 'components/FileInput/FileInput';
import SelectableInput from 'components/SelectableInput/SelectableInput';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import { $enum } from 'ts-enum-util';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

const ExperimentDialogView = ({
  isAddDialog,
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
  clickOnSubmit,
  isValidForm,
  selectedFiles,
  changeSelectedFiles,
}: ExperimentDialogProps): JSX.Element => (
  <>
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
        <IonLabel position="fixed">Dataset:</IonLabel>
        <IonSelect placeholder="Select one" multiple={false}>
          <IonSelectOption>SomeDataset1</IonSelectOption>
          <IonSelectOption>SomeDataset2</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">M.Solution:</IonLabel>
        <IonSelect placeholder="Select one" multiple={false}>
          <IonSelectOption>Some Matching Solution</IonSelectOption>
          <IonSelectOption>Some other Matching Solution</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItemDivider>
        <IonLabel>UPLOAD CONTENT</IonLabel>
      </IonItemDivider>
      {/*<IonItem>
        <IonLabel position="fixed">File Format:</IonLabel>
        <SelectableInput
          allOptions={$enum(experimentFileFormatEnum).map(
            (form) => form as string
          )}
          currentOption={experimentFileFormat}
          setOption={changeExperimentFileFormat}
        />
      </IonItem>*/}
      <IonItem>
        <IonLabel position="fixed">Source File:</IonLabel>
        <FileInput
          selectedFiles={selectedFiles}
          onChange={changeSelectedFiles}
          allowMultiple={false}
          disabled={!isAddDialog}
        />
      </IonItem>
      {!isAddDialog ? (
        <div className="center">
          <IonNote color="medium">
            Note: This option is disabled for experiment updates.
          </IonNote>
        </div>
      ) : null}
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
        onClick={clickOnSubmit}
        disabled={!isValidForm}
      >
        <IonIcon
          slot="start"
          icon={isAddDialog ? addCircleOutline : checkmarkCircleOutline}
        />
        {isAddDialog ? 'Add' : 'Update'}
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
  </>
);

export default ExperimentDialogView;
