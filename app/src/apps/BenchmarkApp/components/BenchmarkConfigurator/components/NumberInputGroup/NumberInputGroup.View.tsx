import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { NumberInputGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/NumberInputGroup/NumberInputGroupProps';
import React from 'react';

const NumberInputGroupView = ({
  title,
  value,
  setValue,
}: NumberInputGroupProps): JSX.Element => (
  <IonItem>
    <IonLabel position="fixed">{`${title ?? 'Threshold'}:`}</IonLabel>
    <IonInput
      type="number"
      value={value}
      onIonChange={setValue}
      placeholder="0"
    />
  </IonItem>
);

export default NumberInputGroupView;
