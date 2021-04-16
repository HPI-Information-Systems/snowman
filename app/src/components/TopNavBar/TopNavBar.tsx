import { IonButton, IonButtons } from '@ionic/react';
import styles from 'components/TopNavBar/TopNavBarStyles.module.css';
import React from 'react';
import style from 'theme/style';

const TopNavBar = (): JSX.Element => (
  <div className={styles.toolbar}>
    <div className={styles.toolbarContainer}>
      <IonButtons slot="start" class={styles.buttonContainer}>
        <IonButton
          fill="clear"
          size="large"
          class={style(styles.buttonElement, styles.active)}
        >
          Benchmark
        </IonButton>
        <IonButton fill="clear" class={styles.buttonElement}>
          Datasets
        </IonButton>
        <IonButton fill="clear" class={styles.buttonElement}>
          Experiments
        </IonButton>
        <IonButton fill="clear" class={styles.buttonElement}>
          Matching Solutions
        </IonButton>
      </IonButtons>
    </div>
  </div>
);

export default TopNavBar;
