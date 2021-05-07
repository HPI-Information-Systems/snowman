import { IonIcon, IonInput, IonItem } from '@ionic/react';
import { NumberInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputStyles.module.css';
import { gitCommitOutline } from 'ionicons/icons';
import React from 'react';
const NumberInputGroupView = ({
  value,
  setValue,
}: NumberInputProps): JSX.Element => (
  <IonItem>
    <IonIcon
      icon={gitCommitOutline}
      color={'primarydark'}
      className={styles.smallItemIcon}
    />
    <IonInput
      type="number"
      value={value}
      onIonChange={setValue}
      placeholder="0"
    />
  </IonItem>
);

export default NumberInputGroupView;
