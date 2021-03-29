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
import ExperimentPreview from 'components/ExperimentPreview/ExperimentPreview';
import { create, trash } from 'ionicons/icons';
import React, { useState } from 'react';

const ExperimentCard = ({
  experimentName,
  algorithmName,
  experimentId,
  description,
  numberOfRecords,
  timeToConfigure,
  editExperiment,
  deleteExperiment,
}: ExperimentCardProps): JSX.Element => {
  const [showExperimentPreview, setShowExperimentPreview] = useState(false);
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
              onClick={() => setShowExperimentPreview(true)}
            >
              <IonLabel>Count: {numberOfRecords ?? 'none'}</IonLabel>
            </IonChip>
            {timeToConfigure !== undefined ? (
              <IonChip color="dark" outline={false}>
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
      <ExperimentPreview
        experimentId={experimentId}
        experimentName={experimentName}
        isOpen={showExperimentPreview}
        rowCount={numberOfRecords ?? 0}
        closeDialog={() => setShowExperimentPreview(false)}
      />
    </IonCard>
  );
};

export default ExperimentCard;
