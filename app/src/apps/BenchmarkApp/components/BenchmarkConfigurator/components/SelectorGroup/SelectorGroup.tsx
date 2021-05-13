import { IonIcon, IonItem, IonList, IonText } from '@ionic/react';
import { SelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupStyles.module.css';
import { ellipsisVerticalCircle } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const EmptyPlaceholder = (): JSX.Element => (
  <IonText color="medium">{'<None>'}</IonText>
);

const SelectorGroup = ({ onClick, items }: SelectorGroupProps): JSX.Element => (
  <IonItem button onClick={onClick} className={style(styles.fullWidth)}>
    <IonList className={style(styles.listNoPadding, styles.noBackground)}>
      {items.length === 0 ? (
        <IonItem
          className={style(
            styles.smallItem,
            styles.itemNoBorder,
            styles.oneLine
          )}
        >
          <EmptyPlaceholder />
        </IonItem>
      ) : null}
      {items.map(({ icon, indent, title }, index) => (
        <IonItem
          key={index}
          className={style(
            styles.smallItem,
            styles.itemNoBorder,
            styles.oneLine
          )}
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
          {title.length > 0 ? title : <EmptyPlaceholder />}
        </IonItem>
      ))}
    </IonList>
    <IonIcon icon={ellipsisVerticalCircle} color="medium" slot="end" />
  </IonItem>
);

export default SelectorGroup;
