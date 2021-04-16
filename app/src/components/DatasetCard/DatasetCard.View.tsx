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
import { create, telescope, trash } from 'ionicons/icons';
import React from 'react';

const DatasetCardView = ({
  dataset,
  couldPreview,
  deleteDataset,
  editDataset,
  previewDataset,
}: DatasetCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardSubtitle>
        {(dataset.tags ?? []).join(', ').toUpperCase()}
      </IonCardSubtitle>
      <IonCardTitle>{dataset.name}</IonCardTitle>
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
        <IonCol size="4" class="ion-text-left">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editDataset}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonButton>
        </IonCol>
        <IonCol size="4" class="ion-text-center">
          {couldPreview ? (
            <IonButton
              size="small"
              fill="clear"
              color="dark"
              onClick={previewDataset}
            >
              <IonIcon slot="icon-only" icon={telescope} />
            </IonButton>
          ) : null}
        </IonCol>
        <IonCol size="4" class="ion-text-right">
          <IonButton
            size="small"
            fill="clear"
            color="danger"
            onClick={deleteDataset}
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default DatasetCardView;
