import { IonIcon } from '@ionic/react';
import { StrategyUnselectorProps } from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorProps';
import styles from 'apps/FunctionBuilderDialog/components/StrategyUnselector/StrategyUnselectorStyles.module.css';
import { closeCircleOutline } from 'ionicons/icons';
import React from 'react';

const StrategyUnselectorView = ({
  isStrategySelected,
  unselectStrategy,
}: StrategyUnselectorProps): JSX.Element => (
  <>
    {isStrategySelected ? (
      <IonIcon
        className={styles.icon}
        icon={closeCircleOutline}
        color="danger"
        onClick={unselectStrategy}
      />
    ) : null}
  </>
);

export default StrategyUnselectorView;
