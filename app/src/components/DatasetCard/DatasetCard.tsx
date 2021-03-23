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
  trash,
} from 'ionicons/icons';
import React from 'react';

const DatasetCard = ({
  datasetName,
  isSelected,
  categories,
  description,
  totalCount,
  uploadedCount,
  selectDataset,
  deleteDataset,
  editDataset,
}: DatasetCardProps): JSX.Element => {
  return (
    <IonCard button={false}>
      <IonCardHeader>
        <IonCardSubtitle>{categories.join(', ').toUpperCase()}</IonCardSubtitle>
        <IonCardTitle>
          {datasetName}
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
        {description !== null ? <p>{description}</p> : null}
      </IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonChip color="dark" outline={false}>
              <IonLabel>Total: {totalCount ?? 'unknown'}</IonLabel>
            </IonChip>
            <IonChip color="dark" outline={false}>
              <IonLabel>Uploaded: {uploadedCount ?? 'none'}</IonLabel>
            </IonChip>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
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
          <IonCol size="6">
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
};

export default DatasetCard;
