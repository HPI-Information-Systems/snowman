import { IonButton, IonIcon, IonItem, IonList } from '@ionic/react';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { MultiSelectorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorStyles.module.css';
import { addCircle, closeCircleOutline } from 'ionicons/icons';
import React from 'react';

const MultiSelectorView = ({
  cacheKeys,
  push,
  remove,
}: MultiSelectorProps): JSX.Element => (
  <IonItem className={styles.itemNoBorder}>
    <IonList className={styles.list}>
      {cacheKeys.map((cacheKey, index) => (
        <IonItem key={index}>
          <AtomicSelectorGroup cacheKey={cacheKey} allowMultiple={false} />
          <IonButton color="danger" onClick={() => remove(cacheKey)}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonItem>
      ))}
      <IonItem button onClick={push}>
        <IonIcon icon={addCircle} slot="end" color="dark" />
      </IonItem>
    </IonList>
  </IonItem>
);

export default MultiSelectorView;
