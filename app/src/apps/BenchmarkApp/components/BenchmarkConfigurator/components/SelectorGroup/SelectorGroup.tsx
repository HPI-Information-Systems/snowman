import { IonIcon, IonItem, IonList } from '@ionic/react';
import { SelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupStyles.module.css';
import { ellipsisVerticalCircle } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const SelectorGroup = ({ onClick, items }: SelectorGroupProps): JSX.Element => (
  <IonItem button onClick={onClick}>
    <IonList className={style(styles.listNoPadding, styles.noBackground)}>
      {items.map(({ icon, indent, title }, index) => (
        <IonItem
          key={index}
          className={style(styles.smallItem, styles.itemNoBorder)}
          style={{
            marginLeft: 8 * (indent ?? 0),
          }}
        >
          <IonIcon
            icon={icon}
            color="primarydark"
            className={styles.smallItemIcon}
            slot="start"
          />
          {title}
        </IonItem>
      ))}
    </IonList>
    <IonIcon icon={ellipsisVerticalCircle} color="medium" slot="end" />
  </IonItem>
);

export default SelectorGroup;
