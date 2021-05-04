import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { MultiSelectorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/MultiSelector/MultiSelectorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/MultiSelector/MultiSelectorStyles.module.css';
import SelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroup';
import { add, analytics, flask, gitCommit } from 'ionicons/icons';
import React from 'react';

const MultiSelector = ({
  title,
  allowMultiple = true,
}: MultiSelectorProps): JSX.Element => (
  <IonItem className={styles.itemNoBorder}>
    <IonLabel>
      <h3 className={styles.marginedHeading}>
        <b>{title}</b>
      </h3>
      <IonList className={styles.listNoPadding}>
        <SelectorGroup
          onClick={(): void => console.log('click')}
          FirstItem="goldstandard"
          FirstItemIcon={flask}
          SecondItem="distance23"
          SecondItemIcon={analytics}
          ThirdItem="54.392"
          ThirdItemIcon={gitCommit}
        />
        {allowMultiple ? (
          <IonItem>
            <sub>
              Add New Experiment
              <IonIcon icon={add} />
            </sub>
          </IonItem>
        ) : null}
      </IonList>
    </IonLabel>
  </IonItem>
);

export default MultiSelector;