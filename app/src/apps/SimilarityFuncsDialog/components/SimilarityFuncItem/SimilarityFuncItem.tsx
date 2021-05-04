import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { SimilarityFuncItemProps } from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import { analytics, construct, trash } from 'ionicons/icons';
import React from 'react';

const SimilarityFuncItem = ({
  functionName,
}: SimilarityFuncItemProps): JSX.Element => (
  <IonItem>
    <IonIcon icon={analytics} />
    <IonLabel>{functionName}</IonLabel>
    <IonButton>
      <IonIcon icon={construct} />
    </IonButton>
    <IonButton>
      <IonIcon icon={trash} />
    </IonButton>
  </IonItem>
);

export default SimilarityFuncItem;
