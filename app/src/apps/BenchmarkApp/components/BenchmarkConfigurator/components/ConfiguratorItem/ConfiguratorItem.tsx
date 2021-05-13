import { IonItem, IonLabel, IonList } from '@ionic/react';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { ConfiguratorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItemProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItemStyles.module.css';
import React from 'react';

const ConfiguratorItem = ({
  title,
  configurators,
}: ConfiguratorItemProps): JSX.Element => (
  <IonItem className={styles.itemNoBorder}>
    <div className={styles.fullWidth}>
      <IonLabel>
        <h2 className={styles.marginedHeading}>
          <b>{title}</b>
        </h2>
      </IonLabel>
      <IonList>
        {configurators.map(([cacheKey, allowMultiSelect], index) => (
          <AtomicSelectorGroup
            key={index}
            cacheKey={cacheKey}
            allowMultiple={allowMultiSelect}
          />
        ))}
      </IonList>
    </div>
  </IonItem>
);

export default ConfiguratorItem;
