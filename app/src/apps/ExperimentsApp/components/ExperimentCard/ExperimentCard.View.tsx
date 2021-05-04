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
import { ExperimentCardProps } from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCardProps';
import styles from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCardStyles.module.css';
import { analytics, create, telescope, trash } from 'ionicons/icons';
import React from 'react';

const ExperimentCardView = ({
  algorithmName,
  datasetName,
  couldPreview,
  experiment,
  editExperiment,
  deleteExperiment,
  editSimilarityFunctions,
  previewExperiment,
}: ExperimentCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardSubtitle>
        <b>{datasetName}</b> ({algorithmName})
      </IonCardSubtitle>
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
            className={styles.customDisabledChip}
            disabled
          >
            <IonLabel>
              Count: {experiment.numberOfUploadedRecords ?? 'none'}
            </IonLabel>
          </IonChip>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3" className="ion-text-left">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editExperiment}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonButton>
        </IonCol>
        <IonCol size="3" className="ion-text-left">
          <IonButton
            size="small"
            fill="clear"
            color="primarydark"
            onClick={editSimilarityFunctions}
          >
            <IonIcon slot="icon-only" icon={analytics} />
          </IonButton>
        </IonCol>
        <IonCol size="3" className="ion-text-center">
          {couldPreview ? (
            <IonButton
              size="small"
              fill="clear"
              color="dark"
              onClick={previewExperiment}
            >
              <IonIcon slot="icon-only" icon={telescope} />
            </IonButton>
          ) : null}
        </IonCol>
        <IonCol size="3" className="ion-text-right">
          <IonButton
            size="small"
            fill="clear"
            color="danger"
            onClick={deleteExperiment}
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default ExperimentCardView;
