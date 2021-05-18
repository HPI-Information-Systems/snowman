import { IonIcon, IonItem, IonList } from '@ionic/react';
import { SelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupStyles.module.css';
import { EmptyPlaceholder } from 'components/simple/EmptyPlaceholder/EmptyPlaceholder';
import EntityItem from 'components/simple/EntityItem/EntityItem';
import { ellipsisVerticalCircle } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

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
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            marginLeft: 8 * (item.indent ?? 0),
          }}
        >
          {'itemId' in item ? (
            <EntityItem {...item} />
          ) : (
            <IonItem
              className={style(
                styles.smallItem,
                styles.itemNoBorder,
                styles.oneLine
              )}
            >
              <IonIcon
                icon={item.icon}
                color="primarydark"
                className={styles.smallItemIcon}
                slot="start"
              />
              {item.title ?? <EmptyPlaceholder />}
            </IonItem>
          )}
        </div>
      ))}
    </IonList>
    <IonIcon icon={ellipsisVerticalCircle} color="medium" slot="end" />
  </IonItem>
);

export default SelectorGroup;
