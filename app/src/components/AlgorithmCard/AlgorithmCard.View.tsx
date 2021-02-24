import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import { AlgorithmCardProps } from 'components/AlgorithmCard/AlgorithmCardProps';
import { pencil, trash } from 'ionicons/icons';
import React from 'react';

const AlgorithmCardView = ({
  algorithm,
  deleteAlgorithm,
  editAlgorithm,
}: AlgorithmCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardTitle>
        {algorithm.name}
        <IonButton
          size="small"
          fill="clear"
          color="danger"
          onClick={deleteAlgorithm}
          className="ion-float-right"
        >
          <IonIcon icon={trash} />
        </IonButton>
        <IonButton
          size="small"
          fill="clear"
          color="dark"
          onClick={editAlgorithm}
          className="ion-float-right"
        >
          <IonIcon icon={pencil} />
        </IonButton>
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>{algorithm.description}</IonCardContent>
  </IonCard>
);

export default AlgorithmCardView;
