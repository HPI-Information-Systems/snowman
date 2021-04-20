import 'apps/DatasetDialog/DatasetDialogStyles.css';

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
import FileInput from 'components/FileInput/FileInput';
import InputChip from 'components/InputChip/InputChip';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
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
      <div className="center upload-notice">
        <IonNote color="medium">
          <b>Note: Uploading a file is optional here!</b>
          <br />
          If no file is selected, the stored records will remain unchanged.
        </IonNote>
      </div>
    ) : null}
    <div className="center tag-view">
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
        submitValueCallback={createTag}
      />
    </div>
    <div className="center button-row">
      <IonButton
        className="button-hugh button-padding"
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

export default DatasetDialogView;
