import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { NumberInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputProps';
import React from 'react';

const NumberInputGroupView = ({
  title,
  value,
  setValue,
}: NumberInputProps): JSX.Element => (
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
