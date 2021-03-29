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
import { ExperimentCardProps } from 'components/ExperimentCard/ExperimentCardProps';
import { create, trash } from 'ionicons/icons';
import React from 'react';

const ExperimentCard = ({
  experimentName,
  algorithmName,
  description,
  numberOfRecords,
  timeToConfigure,
  editExperiment,
  deleteExperiment,
  previewExperiment,
}: ExperimentCardProps): JSX.Element => {
  return (
    <IonCard button={false}>
      <IonCardHeader>
        <IonCardSubtitle>{algorithmName}</IonCardSubtitle>
        <IonCardTitle>{experimentName}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description !== undefined ? <p>{description}</p> : null}
      </IonCardContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonChip
              color="dark"
              outline={false}
              class="custom-disabled-chip"
              disabled={numberOfRecords === undefined}
              onClick={(): void =>
                numberOfRecords !== undefined ? previewExperiment() : undefined
              }
            >
              <IonLabel>Count: {numberOfRecords ?? 'none'}</IonLabel>
            </IonChip>
            {timeToConfigure !== undefined ? (
              <IonChip color="medium" outline={false}>
                <IonLabel>Config Time: {timeToConfigure}</IonLabel>
              </IonChip>
            ) : null}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonButton
              size="small"
              fill="clear"
              color="primary"
              onClick={editExperiment}
              className="ion-float-left"
            >
              <IonIcon slot="start" icon={create} />
              Edit
            </IonButton>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonButton
              size="small"
              fill="clear"
              color="danger"
              onClick={deleteExperiment}
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

export default ExperimentCard;
