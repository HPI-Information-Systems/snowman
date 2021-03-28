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
import DatasetPreview from 'components/DatasetPreview/DatasetPreview';
import {
  create,
  radioButtonOffOutline,
  radioButtonOnOutline,
  trash,
} from 'ionicons/icons';
import React, { useState } from 'react';

const DatasetCard = ({
  datasetName,
  datasetId,
  isSelected,
  categories,
  description,
  totalCount,
  uploadedCount,
  selectDataset,
  deleteDataset,
  editDataset,
}: DatasetCardProps): JSX.Element => {
  const [datasetPreviewIsOpen, setDatasetPreviewIsOpen] = useState(false);

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
            <IonChip
              color="dark"
              outline={false}
              onClick={() => uploadedCount && setDatasetPreviewIsOpen(true)}
            >
              <IonLabel>Total: {totalCount ?? 'unknown'}</IonLabel>
            </IonChip>
            <IonChip
              color="dark"
              outline={false}
              onClick={() => uploadedCount && setDatasetPreviewIsOpen(true)}
            >
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
      <DatasetPreview
        closeDialog={() => setDatasetPreviewIsOpen(false)}
        datasetId={datasetId}
        datasetName={datasetName}
        isOpen={datasetPreviewIsOpen}
        rowCount={uploadedCount ?? 0}
      ></DatasetPreview>
    </IonCard>
  );
};

export default DatasetCard;
