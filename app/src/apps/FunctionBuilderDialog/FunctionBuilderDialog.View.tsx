import { IonButton, IonIcon } from '@ionic/react';
import StrategyMapper from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapper';
import { FunctionBuilderDialogProps } from 'apps/FunctionBuilderDialog/FunctionBuilderDialogProps';
import styles from 'apps/FunctionBuilderDialog/FunctionBuilderDialogStyles.module.css';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const FunctionBuilderDialogView = ({
  clickOnCancel,
  clickOnAddOrUpdate,
  isAddDialog,
}: FunctionBuilderDialogProps): JSX.Element => (
  <>
    <div className={styles.container}>
      <StrategyMapper parentAccessKey={null} />
    </div>
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton
        onClick={clickOnAddOrUpdate}
        className={style(styles.buttonHugh, styles.buttonPadding)}
      >
        <IonIcon
          slot="start"
          icon={isAddDialog ? addCircleOutline : checkmarkCircleOutline}
        />
        {isAddDialog ? 'Add' : 'Update'}
      </IonButton>
      <IonButton
        onClick={clickOnCancel}
        color="light"
        className={style(styles.buttonHugh, styles.buttonPadding)}
      >
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel
      </IonButton>
    </div>
  </>
);

export default FunctionBuilderDialogView;
