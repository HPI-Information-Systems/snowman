import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorStyles.module.css';
import SelectorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorItem/SelectorItem';
import { add, analytics, flask, gitCommit } from 'ionicons/icons';
import React from 'react';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Configurator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3 className={styles.marginedHeading}>
              <b>1. Select Ground Truth</b>
            </h3>
            <IonList className={styles.listNoPadding}>
              <SelectorItem
                onClick={(): void => console.log('click')}
                FirstItem="goldstandard"
                FirstItemIcon={flask}
                SecondItem="distance23"
                SecondItemIcon={analytics}
                ThirdItem="54.392"
                ThirdItemIcon={gitCommit}
              />
              <IonItem>
                <IonIcon slot="start" icon={add} />
                Add New Experiment
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3 className={styles.marginedHeading}>
              <b>2. Select Experiments</b>
            </h3>
            <IonList className={styles.listNoPadding}>
              <SelectorItem
                onClick={(): void => console.log('click')}
                FirstItem="goldstandard"
                FirstItemIcon={flask}
                SecondItem="distance23"
                SecondItemIcon={analytics}
                ThirdItem="54.392"
                ThirdItemIcon={gitCommit}
              />
            </IonList>
          </IonLabel>
        </IonItem>
        <IonItem className={styles.itemNoBorder}>
          <IonLabel>
            <h3 className={styles.marginedHeading}>
              <b>3. Select More Experiments</b>
            </h3>
            <IonList className={styles.listNoPadding}>
              <SelectorItem
                onClick={(): void => console.log('click')}
                FirstItem="goldstandard"
                FirstItemIcon={flask}
                SecondItem="distance23"
                SecondItemIcon={analytics}
                ThirdItem="54.392"
                ThirdItemIcon={gitCommit}
              />
            </IonList>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
