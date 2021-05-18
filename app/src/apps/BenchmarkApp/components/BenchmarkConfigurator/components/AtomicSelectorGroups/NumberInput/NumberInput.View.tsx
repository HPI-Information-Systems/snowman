import { IonIcon, IonInput, IonItem } from '@ionic/react';
import { NumberInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/NumberInput/NumberInputStyles.module.css';
import { gitCommit } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';
const NumberInputGroupView = ({
  value,
  setValue,
}: NumberInputProps): JSX.Element => (
  <IonItem
    className={style(
      styles.fullWidth,
      styles.itemNoEndPad,
      styles.itemNoBorder
    )}
  >
    <IonItem className={style(styles.fullWidth, styles.itemResetEndPad)}>
      <IonIcon
        icon={gitCommit}
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
  </IonItem>
);

export default NumberInputGroupView;
