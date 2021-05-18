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
  IonTextarea,
} from '@ionic/react';
import { ExperimentDialogProps } from 'apps/ExperimentDialog/ExperimentDialogProps';
import styles from 'apps/ExperimentDialog/ExperimentDialogStyles.module.css';
import { ExperimentSegmentTypeEnum } from 'apps/ExperimentDialog/types/ExperimentSegmentTypeEnum';
import FileInput from 'components/simple/FileInput/FileInput';
import AlgorithmSelectableInput from 'components/stateful/SelectableInputFactory/flavors/AlgorithmSelectableInput';
import DatasetSelectableInput from 'components/stateful/SelectableInputFactory/flavors/DatasetSelectableInput';
import SelectableInput from 'components/stateful/SelectableInputFactory/flavors/SelectableInput';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  chevronDown,
  chevronUp,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';
import { $enum } from 'ts-enum-util';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

const ExperimentDialogView = ({
  algorithms,
  changeAlgorithm,
  changeDataset,
  changeExperimentDescription,
  changeExperimentFileFormat,
  changeExperimentName,
  changeExpertise,
  changeHRAmount,
  changeRuntime,
  changeSelectedFiles,
  clickOnCancel,
  clickOnSubmit,
  datasets,
  experimentDescription,
  experimentFileFormat,
  experimentName,
  expertise,
  hrAmount,
  isAddDialog,
  isValidForm,
  runtime,
  selectedAlgorithm,
  selectedDataset,
  selectedFiles,
  expandedSegments,
  toggleSegmentExpansion,
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
        <DatasetSelectableInput
          allOptions={datasets}
          allowMultiselect={false}
          onChange={(selection) => changeDataset(selection[0])}
          selection={
            typeof selectedDataset === 'number' ? [selectedDataset] : []
          }
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">
          Matching <br />
          Solution:
        </IonLabel>
        <AlgorithmSelectableInput
          allOptions={algorithms}
          allowMultiselect={false}
          onChange={(selection) => changeAlgorithm(selection[0])}
          selection={
            typeof selectedAlgorithm === 'number' ? [selectedAlgorithm] : []
          }
        />
      </IonItem>

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(ExperimentSegmentTypeEnum.CONFIGURATION_EFFORT)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(
              ExperimentSegmentTypeEnum.CONFIGURATION_EFFORT
            )
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>CONFIGURATION EFFORT:</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(
        ExperimentSegmentTypeEnum.CONFIGURATION_EFFORT
      ) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">
              Matching
              <br /> Solution
              <br /> Knowledge
              <br /> Level %:
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
            <span className={styles.inputUnit}>man-hr</span>
          </IonItem>
        </>
      ) : null}

      <IonItemDivider
        onClick={() =>
          toggleSegmentExpansion(ExperimentSegmentTypeEnum.OTHER_KPIS)
        }
      >
        <IonIcon
          icon={
            expandedSegments.includes(ExperimentSegmentTypeEnum.OTHER_KPIS)
              ? chevronUp
              : chevronDown
          }
          slot="end"
        />
        <IonLabel>OTHER KPIS:</IonLabel>
      </IonItemDivider>
      {expandedSegments.includes(ExperimentSegmentTypeEnum.OTHER_KPIS) ? (
        <>
          <IonItem>
            <IonLabel position="fixed">Runtime: </IonLabel>
            <IonInput
              type="number"
              placeholder="0"
              value={runtime}
              onIonChange={changeRuntime}
            />
            <span className={styles.inputUnit}>hr</span>
          </IonItem>
        </>
      ) : null}

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
