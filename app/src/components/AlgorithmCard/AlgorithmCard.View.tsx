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
import {
  create,
  radioButtonOffOutline,
  radioButtonOnOutline,
  trash,
} from 'ionicons/icons';
import React from 'react';

const AlgorithmCardView = ({
  algorithm,
  isSelected,
  deleteAlgorithm,
  selectAlgorithm,
  editAlgorithm,
}: AlgorithmCardProps): JSX.Element => (
  <IonCard button={false}>
    <IonCardHeader>
      <IonCardTitle>
        {algorithm.name}
        <span onClick={selectAlgorithm} style={{ cursor: 'pointer' }}>
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
