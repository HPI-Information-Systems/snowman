import { IonIcon, IonItem } from '@ionic/react';
import { DatasetSelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorItem/DatasetSelectorItemProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorItem/SelectorItemStyles.module.css';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const DatasetSelectorItemView = ({
  dataset,
}: DatasetSelectorItemProps): JSX.Element => (
  <IonItem className={style(styles.smallItem, styles.itemNoBorder)}>
    {dataset !== undefined ? (
      <>
        <IonIcon
          icon={fileTrayFull}
          color="primarydark"
          className={styles.smallItemIcon}
          slot="start"
        />
        {dataset?.name ?? 'none'}
      </>
    ) : null}
  </IonItem>
);

export default DatasetSelectorItemView;
