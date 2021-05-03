import { IonIcon, IonItem, IonList } from '@ionic/react';
import { SelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorItem/SelectorItemProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorItem/SelectorItemStyles.module.css';
import { ellipsisVerticalCircle } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const SelectorItem = ({
  onClick,
  FirstItem,
  FirstItemIcon,
  SecondItem,
  SecondItemIcon,
  ThirdItem,
  ThirdItemIcon,
}: SelectorItemProps): JSX.Element => (
  <IonItem button onClick={onClick}>
    <IonList className={style(styles.listNoPadding, styles.noBackground)}>
      <IonItem className={style(styles.smallItem, styles.itemNoBorder)}>
        <IonIcon
          icon={FirstItemIcon}
          color="primarydark"
          className={styles.smallItemIcon}
          slot="start"
        />
        {FirstItem}
      </IonItem>
      <IonItem
        className={style(
          styles.smallItem,
          styles.itemNoBorder,
          styles.insetOnce
        )}
      >
        <IonIcon
          icon={SecondItemIcon}
          color="primarydark"
          className={styles.smallItemIcon}
          slot="start"
        />
        {SecondItem}
      </IonItem>
      <IonItem
        className={style(
          styles.smallItem,
          styles.itemNoBorder,
          styles.insetTwice
        )}
      >
        <IonIcon
          icon={ThirdItemIcon}
          color="primarydark"
          className={styles.smallItemIcon}
          slot="start"
        />
        {ThirdItem}
      </IonItem>
    </IonList>
    <IonIcon icon={ellipsisVerticalCircle} color="medium" slot="end" />
  </IonItem>
);

export default SelectorItem;
