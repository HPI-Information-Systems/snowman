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
import { AlgorithmCardProps } from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCardProps';
import { create, trash } from 'ionicons/icons';
import React from 'react';
import { isPredefinedAlgorithm } from 'utils/algorithmHelpers';

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
        <IonCol size="6" className="ion-text-left">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editAlgorithm}
            disabled={isPredefinedAlgorithm(algorithm)}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonButton>
        </IonCol>
        <IonCol size="6" className="ion-text-right">
          <IonButton
            size="small"
            fill="clear"
            color="danger"
            onClick={deleteAlgorithm}
            disabled={isPredefinedAlgorithm(algorithm)}
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default AlgorithmCardView;
