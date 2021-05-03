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
import { analytics, flask, gitCommit } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Sidebar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Select Ground Truth</h3>
            <IonList className={styles.smallItemList}>
              <IonItem className={styles.smallItem}>
                <IonIcon
                  icon={flask}
                  color="primarydark"
                  className={styles.smallItemIcon}
                  slot="start"
                />
                goldstandard
              </IonItem>
              <IonItem className={style(styles.smallItem, styles.insetOnce)}>
                <IonIcon
                  icon={analytics}
                  color="primarydark"
                  className={styles.smallItemIcon}
                  slot="start"
                />
                squaredist2
              </IonItem>
              <IonItem className={style(styles.smallItem, styles.insetTwice)}>
                <IonIcon
                  icon={gitCommit}
                  color="primarydark"
                  className={styles.smallItemIcon}
                  slot="start"
                />
                54.435
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
