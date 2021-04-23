import {
  IonButton,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { DatasetDialogProps } from 'apps/DatasetDialog/DatasetDialogProps';
import styles from 'apps/DatasetDialog/DatasetDialogStyles.module.css';
import FileInput from 'components/simple/FileInput/FileInput';
import InputChip from 'components/stateful/InputChip/InputChip';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';
import { $enum } from 'ts-enum-util';
import { DatasetTypes } from 'types/DatasetTypes';

const DatasetDialogView = ({
  isAddDialog,
  isValidAnsweredDialog,
  clickOnCancel,
  datasetName,
  changeDatasetName,
  datasetType,
  changeDatasetType,
  datasetLength,
  changeDatasetLength,
  csvIdColumn,
  changeCsvIdColumn,
  csvSeparator,
  changeCsvSeparator,
  csvEscape,
  changeCsvEscape,
  csvQuote,
  changeCsvQuote,
  selectedFiles,
  changeSelectedDatasetFiles,
  tags,
  selectedTags,
  datasetDescription,
  changeDatasetDescription,
  clickOnATag,
  createTag,
  clickOnSubmit,
}: DatasetDialogProps): JSX.Element => (
  <>
    <IonList>
      <IonItemGroup>
        <IonItem>
          <IonLabel position="fixed">Name/ID*:</IonLabel>
          <IonInput
            clearInput
            value={datasetName}
            onIonChange={changeDatasetName}
            placeholder="e.g. hpi-restaurants"
            minlength={1}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Description:</IonLabel>
          <IonTextarea
            value={datasetDescription}
            onIonChange={changeDatasetDescription}
            placeholder="e.g. Combined list of restaurants from different sources."
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Contents:</IonLabel>
          <IonSelect
            multiple={false}
            value={datasetType}
            onIonChange={changeDatasetType}
          >
            {$enum(DatasetTypes).map((kind, key) => (
              <IonSelectOption key={'type-option-' + key} value={kind}>
                {kind}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonItemGroup>
      {datasetType === DatasetTypes.skeleton ? (
        <IonItemGroup>
          <IonItemDivider>DATASET SETTINGS</IonItemDivider>
          <IonItem>
            <IonLabel position="fixed">Records:</IonLabel>
            <IonInput
              type="number"
              value={datasetLength}
              onIonChange={changeDatasetLength}
              placeholder="0"
            />
          </IonItem>
        </IonItemGroup>
      ) : null}
      {datasetType === DatasetTypes.full ? (
        <IonItemGroup>
          <IonItemDivider>CSV SETTINGS</IonItemDivider>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="3">
                  <IonLabel position="fixed">ID Column:</IonLabel>
                  <IonInput
                    clearInput
                    value={csvIdColumn}
                    onIonChange={changeCsvIdColumn}
                    placeholder="tuple_id"
                    minlength={1}
                  />
                </IonCol>
                <IonCol size="3">
                  <IonLabel position="fixed">Separator:</IonLabel>
                  <IonInput
                    clearInput
                    value={csvSeparator}
                    onIonChange={changeCsvSeparator}
                    placeholder=","
                    minlength={1}
                  />
                </IonCol>
                <IonCol size="3">
                  <IonLabel position="fixed">Quote:</IonLabel>
                  <IonInput
                    clearInput
                    value={csvQuote}
                    onIonChange={changeCsvQuote}
                    placeholder='"'
                    minlength={1}
                  />
                </IonCol>
                <IonCol size="3">
                  <IonLabel position="fixed">Escape:</IonLabel>
                  <IonInput
                    clearInput
                    value={csvEscape}
                    onIonChange={changeCsvEscape}
                    placeholder="'"
                    minlength={1}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Source File:</IonLabel>
            <FileInput
              selectedFiles={selectedFiles}
              onChange={changeSelectedDatasetFiles}
            />
          </IonItem>
        </IonItemGroup>
      ) : null}
    </IonList>
    {!isAddDialog ? (
      <div className={style(styles.center, styles.uploadNotice)}>
        <IonNote color="medium">
          <b>Note: Uploading a file is optional here!</b>
          <br />
          If no file is selected, the stored records will remain unchanged.
        </IonNote>
      </div>
    ) : null}
    <div className={style(styles.center, styles.tagView)}>
      {tags.map(
        (aTag: string): JSX.Element => (
          <IonChip
            color={selectedTags.includes(aTag) ? 'primary' : 'dark'}
            outline={false}
            key={aTag}
            onClick={(): void => clickOnATag(aTag)}
          >
            <IonLabel>{aTag}</IonLabel>
          </IonChip>
        )
      )}
      <InputChip
        label="Add domain"
        placeholder="New domain's name"
        instanceDescriptor="datasetDialog1"
        submitValueCallback={createTag}
      />
    </div>
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
        onClick={clickOnSubmit}
        disabled={!isValidAnsweredDialog}
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

export default DatasetDialogView;
