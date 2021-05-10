import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from '@ionic/react';
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
import { IonChangeEvent } from 'types/IonChangeEvent';

const FunctionBuilderDialogView = ({
  clickOnCancel,
  clickOnAddOrUpdate,
  isAddDialog,
  changeFunctionName,
  functionName,
}: FunctionBuilderDialogProps): JSX.Element => (
  <>
    <IonList>
      <IonItem>
        <IonLabel>Function Name:</IonLabel>
        <IonInput
          value={functionName}
          placeholder={'e.g. sumOfSquares'}
          onIonChange={(event: IonChangeEvent): void =>
            changeFunctionName(event.detail.value as string)
          }
        />
      </IonItem>
    </IonList>
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
    <div className={style(styles.center, styles.container)}>
      <IonNote>
        {`A similarity function calculates a custom similarity score for each candidate
        pair using this pair's attributes. Usually, these attributes are calculated
        by your matching solution, e.g. similarity for a certain column. After you 
        created a similarity function here, you'll be able to use it together with 
        a threshold value in the benchmark tab. All pairs with a score higher than 
        the threshold will then be considered duplicates.`}
      </IonNote>
    </div>
  </>
);

export default FunctionBuilderDialogView;
