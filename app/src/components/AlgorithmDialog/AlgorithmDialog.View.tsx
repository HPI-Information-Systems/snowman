import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react';
import styles from 'components/AlgorithmDialog/AlgorithmDialog.module.css';
import { AlgorithmDialogProps } from 'components/AlgorithmDialog/AlgorithmDialogProps';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import React from 'react';
import style from 'theme/style';

const AlgorithmDialogView = ({
  algorithmDescription,
  algorithmName,
  isAddDialog,
  clickOnCancel,
  clickOnSubmit,
  changeAlgorithmDescription,
  changeAlgorithmName,
}: AlgorithmDialogProps): JSX.Element => (
  <>
    <IonList>
      <IonItem>
        <IonLabel position="fixed">Name/ID:</IonLabel>
        <IonInput
          clearInput
          value={algorithmName}
          onIonChange={changeAlgorithmName}
          placeholder="e.g. Internal Solution"
          minlength={1}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Description:</IonLabel>
        <IonTextarea
          value={algorithmDescription}
          onIonChange={changeAlgorithmDescription}
          placeholder="e.g. Matching solution developed by a team at our company."
        />
      </IonItem>
    </IonList>
    <div className={style(styles.center, styles.buttonRow)}>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
        onClick={clickOnSubmit}
      >
        <IonIcon
          slot="start"
          icon={isAddDialog ? addCircleOutline : checkmarkCircleOutline}
        />
        {isAddDialog ? 'Add' : 'Update'}
      </IonButton>
      <IonButton
        className={style(styles.buttonHugh, styles.buttonPadding)}
        onClick={clickOnCancel}
        color="light"
      >
        <IonIcon slot="start" icon={closeCircleOutline} />
        Cancel
      </IonButton>
    </div>
  </>
);

export default AlgorithmDialogView;
