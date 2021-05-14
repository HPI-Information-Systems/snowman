import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { Algorithm, Dataset } from 'api';
import { ExperimentDialogProps } from 'apps/ExperimentDialog/ExperimentDialogProps';
import styles from 'apps/ExperimentDialog/ExperimentDialogStyles.module.css';
import FileInput from 'components/simple/FileInput/FileInput';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';
import { $enum } from 'ts-enum-util';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

const ExperimentDialogView = ({
  isAddDialog,
  clickOnCancel,
  experimentName,
  experimentDescription,
  experimentFileFormat,
  changeExperimentDescription,
  changeExperimentName,
  changeExperimentFileFormat,
  clickOnSubmit,
  isValidForm,
  selectedFiles,
  changeSelectedFiles,
  datasets,
  selectedDataset,
  changeDataset,
  algorithms,
  selectedAlgorithm,
  changeAlgorithm,
  changeExpertise,
  changeHRAmount,
  expertise,
  hrAmount,
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
        <IonSelect
          value={selectedDataset}
          onIonChange={changeDataset}
          placeholder="Select one"
          multiple={false}
        >
          {datasets.map(
            (aDataset: Dataset): JSX.Element => (
              <IonSelectOption
                key={`filter_datasets_${aDataset.id}`}
                value={aDataset.id.toString()}
              >
                {aDataset.name}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">M.Solution:</IonLabel>
        <IonSelect
          value={selectedAlgorithm}
          onIonChange={changeAlgorithm}
          placeholder="Select one"
          multiple={false}
        >
          {algorithms.map(
            (anAlgorithm: Algorithm): JSX.Element => (
              <IonSelectOption
                key={`filter_algorithms_${anAlgorithm.id}`}
                value={anAlgorithm.id.toString()}
              >
                {anAlgorithm.name}
              </IonSelectOption>
            )
          )}
        </IonSelect>
      </IonItem>

      <IonItemDivider>
        <IonLabel>Configuration Effort:</IonLabel>
      </IonItemDivider>

      <IonItem>
        <IonLabel position="fixed">
          Matching
          <br /> Solution
          <br /> Knowledge
          <br /> Level:
        </IonLabel>
        <IonRange
          min={0}
          max={100}
          value={expertise}
          color="primary"
          onIonChange={changeExpertise}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">
          Matching
          <br /> Solution <br />
          HR Amount:
        </IonLabel>
        <IonInput
          type="number"
          placeholder="0"
          value={hrAmount}
          onIonChange={changeHRAmount}
        />
      </IonItem>

      <IonItemDivider>
        <IonLabel>UPLOAD CONTENT</IonLabel>
      </IonItemDivider>
      <IonItem>
        <IonLabel position="fixed">File Format:</IonLabel>
        <SelectableInput
          allOptions={$enum(experimentFileFormatEnum).map(
            (form) => form as string
          )}
          selection={[experimentFileFormat]}
          onChange={(selection) => changeExperimentFileFormat(selection[0])}
          instanceDescriptor="experimentDialog1"
          allowMultiselect={false}
        />
      </IonItem>
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
        <div className={styles.center}>
          <IonNote color="medium">
            Note: This option is disabled for experiment updates.
          </IonNote>
        </div>
      ) : null}
    </IonList>
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
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
        className={style(styles.buttonHugh, styles.buttonPadding)}
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
