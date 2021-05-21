import { IonIcon, IonItem, IonList } from '@ionic/react';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { MULTI_SELECTOR_START } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { AtomicSelectorGroup } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup';
import { MultiSelectorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorStyles.module.css';
import { createCacheKey } from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
import { addCircle, closeCircleOutline } from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';
import useTooltip from 'utils/useTooltipHook';

const MultiSelectorView = ({
  ids,
  push,
  remove,
  cacheKey,
}: MultiSelectorProps): JSX.Element => {
  useTooltip();
  return (
    <IonItem
      className={style(
        styles.itemNoSafePad,
        styles.itemNoBorder,
        styles.itemNoEndPad
      )}
    >
      <IonList className={styles.list}>
        {ids.map((id, index) => (
          <IonItem
            key={index}
            className={style(
              styles.itemNoBorder,
              styles.itemResetEndPad,
              styles.itemNoSafePad
            )}
          >
            <AtomicSelectorGroup
              cacheKey={createCacheKey(
                cacheKey as StoreCacheKey<
                  StoreCacheKeyBaseEnum.multiSelect,
                  [string, number[], ...StoreCacheKey]
                >,
                id
              )}
              allowMultiple={false}
            />

            <IonIcon
              className={styles.pointer}
              icon={closeCircleOutline}
              color={id !== MULTI_SELECTOR_START ? 'danger' : 'light'}
              data-for="tooltip"
              data-tip={
                id === MULTI_SELECTOR_START
                  ? 'This item cannot be removed'
                  : undefined
              }
              onClick={() => remove(id)}
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
};

export default MultiSelectorView;
