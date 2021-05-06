import { IonChip, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';

const SimilarityThresholdStrategy = (): JSX.Element => {
  const [similarityThreshold, setSimilarityThreshold] = useState('a');
  return (
    <IonChip outline>
      <IonSelect placeholder="?">
        <IonSelectOption>a</IonSelectOption>
        <IonSelectOption>b</IonSelectOption>
        <IonSelectOption>c</IonSelectOption>
      </IonSelect>
    </IonChip>
  );
};

export default SimilarityThresholdStrategy;
