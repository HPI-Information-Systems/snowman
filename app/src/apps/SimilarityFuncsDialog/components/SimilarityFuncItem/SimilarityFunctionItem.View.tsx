import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { SimilarityFuncItemProps } from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import { analytics, construct, trash } from 'ionicons/icons';
import React from 'react';

const SimilarityFunctionItemView = ({
  openEditFunctionBuilder,
  similarityFunction,
}: SimilarityFuncItemProps): JSX.Element => (
  <IonItem>
    <IonIcon icon={analytics} />
    <IonLabel>{similarityFunction.name}</IonLabel>
    <IonButton onClick={openEditFunctionBuilder}>
      <IonIcon icon={construct} />
    </IonButton>
    <IonButton>
      <IonIcon icon={trash} />
    </IonButton>
  </IonItem>
);

export default SimilarityFunctionItemView;
