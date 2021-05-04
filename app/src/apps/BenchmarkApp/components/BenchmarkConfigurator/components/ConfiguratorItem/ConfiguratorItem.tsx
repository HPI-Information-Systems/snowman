import { IonItem, IonLabel } from '@ionic/react';
import { ConfiguratorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItemProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItemStyles.module.css';
import React from 'react';

const ConfiguratorItem = ({
  title,
  children,
}: ConfiguratorItemProps): JSX.Element => (
  <IonItem className={styles.itemNoBorder}>
    <div className={styles.fullWidth}>
      <IonLabel>
        <h3 className={styles.marginedHeading}>
          <b>{title}</b>
        </h3>
      </IonLabel>
      {children}
    </div>
  </IonItem>
);

export default ConfiguratorItem;
