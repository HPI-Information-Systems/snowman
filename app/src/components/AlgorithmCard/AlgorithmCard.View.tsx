import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/react';
import { AlgorithmCardProps } from 'components/AlgorithmCard/AlgorithmCardProps';
import { create, trash } from 'ionicons/icons';
import React from 'react';

const AlgorithmCardView = ({
  algorithm,
  deleteAlgorithm,
  editAlgorithm,
}: AlgorithmCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardTitle>{algorithm.name}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>{algorithm.description}</IonCardContent>
    <IonGrid>
      <IonRow>
        <IonCol size="6">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editAlgorithm}
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
            onClick={deleteAlgorithm}
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

export default AlgorithmCardView;
