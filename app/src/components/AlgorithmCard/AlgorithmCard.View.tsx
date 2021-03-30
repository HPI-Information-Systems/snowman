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
          {algorithm.softKPIs?.matchingSolutionType !== undefined ? (
            <IonChip>
              <IonLabel>
                {`Type: ${algorithm.softKPIs?.matchingSolutionType}`}
              </IonLabel>
            </IonChip>
          ) : null}
          {algorithm.softKPIs?.implementationKnowHowLevel !== undefined ? (
            <IonChip>
              <IonLabel>
                {`KnowHow Level: ${algorithm.softKPIs?.implementationKnowHowLevel}`}
              </IonLabel>
            </IonChip>
          ) : null}
          {algorithm.softKPIs?.timeToInstall !== undefined ? (
            <IonChip>
              <IonLabel>
                {`Install Time: ${algorithm.softKPIs?.timeToInstall}`}
              </IonLabel>
            </IonChip>
          ) : null}
          {algorithm.softKPIs?.timeToConfigure !== undefined ? (
            <IonChip>
              <IonLabel>
                {`Config Time: ${algorithm.softKPIs?.timeToConfigure}`}
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
