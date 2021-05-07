import { IonIcon, IonItem, IonList } from '@ionic/react';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { MultiSelectorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorStyles.module.css';
import { addCircle, closeCircleOutline } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const MultiSelectorView = ({
  cacheKeys,
  push,
  remove,
}: MultiSelectorProps): JSX.Element => (
  <IonItem
    className={style(
      styles.itemNoSafePad,
      styles.itemNoBorder,
      styles.itemNoEndPad
    )}
  >
    <IonList className={styles.list}>
      {cacheKeys.map((cacheKey, index) => (
        <IonItem
          key={index}
          className={style(
            styles.itemNoBorder,
            styles.itemResetEndPad,
            styles.itemNoSafePad
          )}
        >
          <AtomicSelectorGroup cacheKey={cacheKey} allowMultiple={false} />
          <IonIcon
            className={styles.pointer}
            icon={closeCircleOutline}
            color="danger"
            onClick={() => remove(cacheKey)}
            slot="end"
          />
        </IonItem>
      ))}
      <IonItem button onClick={push}>
        <IonIcon icon={addCircle} slot="end" color="primarydark" />
      </IonItem>
    </IonList>
  </IonItem>
);

export default MultiSelectorView;
