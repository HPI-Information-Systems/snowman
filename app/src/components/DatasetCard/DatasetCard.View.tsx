import 'components/DatasetCard/DatasetCardStyles.css';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { DatasetCardProps } from 'components/DatasetCard/DatasetCardProps';
import {
  create,
  radioButtonOffOutline,
  radioButtonOnOutline,
  telescopeOutline,
  trash,
} from 'ionicons/icons';
import React from 'react';

const DatasetCardView = ({
  dataset,
  isSelected,
  couldPreview,
  selectDataset,
  deleteDataset,
  editDataset,
  previewDataset,
}: DatasetCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardSubtitle>
        {(dataset.tags ?? []).join(', ').toUpperCase()}
      </IonCardSubtitle>
      <IonCardTitle>
        {dataset.name}
        <span onClick={selectDataset} style={{ cursor: 'pointer' }}>
          {isSelected ? (
            <IonIcon
              className="ion-float-right"
              icon={radioButtonOnOutline}
              size="large"
              color="primary"
            />
          ) : (
            <IonIcon
              className="ion-float-right"
              icon={radioButtonOffOutline}
              size="large"
              color="medium"
            />
          )}
        </span>
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {dataset.description !== null ? <p>{dataset.description}</p> : null}
    </IonCardContent>
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonChip
            color="dark"
            outline={false}
            class="custom-disabled-chip"
            disabled
          >
            <IonLabel>Total: {dataset.numberOfRecords ?? 'unknown'}</IonLabel>
          </IonChip>
          <IonChip
            color="dark"
            outline={false}
            class="custom-disabled-chip"
            disabled
          >
            <IonLabel>
              Uploaded: {dataset.numberOfUploadedRecords ?? 'none'}
            </IonLabel>
          </IonChip>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12" sizeMd="6">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editDataset}
            className="ion-float-left"
          >
            <IonIcon slot="start" icon={create} />
            Edit
          </IonButton>
        </IonCol>
        {couldPreview ? (
          <IonCol size="12" sizeMd="6">
            <IonButton
              size="small"
              fill="clear"
              color="primary"
              onClick={previewDataset}
              className="ion-float-right"
            >
              <IonIcon slot="start" icon={telescopeOutline} />
              Preview
            </IonButton>
          </IonCol>
        ) : null}
        <IonCol size="12" sizeMd="6">
          <IonButton
            size="small"
            fill="clear"
            color="danger"
            onClick={deleteDataset}
            className="ion-float-right"
          >
            <IonIcon slot="start" icon={trash} />
            Delete
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default DatasetCardView;
