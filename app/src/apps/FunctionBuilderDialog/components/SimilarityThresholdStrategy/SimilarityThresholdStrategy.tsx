import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';

const SimilarityThresholdStrategy = (): JSX.Element => {
  const [similarityThreshold, setSimilarityThreshold] = useState('a');
  return (
    <IonChip>
      <IonSelect>
        <IonSelectOption>a</IonSelectOption>
        <IonSelectOption>b</IonSelectOption>
        <IonSelectOption>c</IonSelectOption>
      </IonSelect>
    </IonChip>
  );
};

export default SimilarityThresholdStrategy;
