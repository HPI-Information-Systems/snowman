import { IonItem, IonLabel } from '@ionic/react';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/MultiSelector/MultiSelectorStyles.module.css';
import React from 'react';

const DatasetSelectorView = (): JSX.Element => (
  <IonItem className={styles.itemNoBorder}>
    <IonLabel>
      <h3 className={styles.marginedHeading}>
        <b>Select Dataset</b>
      </h3>
    </IonLabel>
  </IonItem>
);

export default DatasetSelectorView;
