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

const ExperimentCardView = ({
  algorithmName,
  couldPreview,
  experiment,
  editExperiment,
  deleteExperiment,
  previewExperiment,
}: ExperimentCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardSubtitle>{algorithmName}</IonCardSubtitle>
      <IonCardTitle>{experiment.name}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      {experiment.description !== undefined ? (
        <p>{experiment.description}</p>
      ) : null}
    </IonCardContent>
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonChip
            color="dark"
            outline={false}
            class="custom-disabled-chip"
            disabled={couldPreview}
            onClick={previewExperiment}
          >
            <IonLabel>
              Count: {experiment.numberOfUploadedRecords ?? 'none'}
            </IonLabel>
          </IonChip>
          {experiment.softKPIs?.timeToConfigure !== undefined ? (
            <IonChip color="medium" outline={false}>
              <IonLabel>
                Config Time: {experiment.softKPIs.timeToConfigure}
              </IonLabel>
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

export default ExperimentCardView;
