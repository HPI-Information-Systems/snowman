import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
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
        <IonCol>
          {algorithm.softKPIs?.general?.useCase !== undefined ? (
            <IonChip>
              <IonLabel>
                {`Use case: ${algorithm.softKPIs?.general.useCase.join(', ')}`}
              </IonLabel>
            </IonChip>
          ) : null}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="6" class="ion-text-left">
          <IonButton
            size="small"
            fill="clear"
            color="primary"
            onClick={editAlgorithm}
          >
            <IonIcon slot="icon-only" icon={create} />
          </IonButton>
        </IonCol>
        <IonCol size="6" class="ion-text-right">
          <IonButton
            size="small"
            fill="clear"
            color="danger"
            onClick={deleteAlgorithm}
          >
            <IonIcon slot="icon-only" icon={trash} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
);

export default AlgorithmCardView;
