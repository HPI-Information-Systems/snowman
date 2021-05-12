import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { SimilarityFuncItemProps } from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import styles from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemStyles.module.css';
import { analytics, create, telescope, trash } from 'ionicons/icons';
import React from 'react';

const SimilarityFunctionItemView = ({
  openEditFunctionBuilder,
  deleteFunction,
  similarityFunction,
  previewSimilarityFunction,
}: SimilarityFuncItemProps): JSX.Element => (
  <IonItem>
    <IonIcon
      icon={analytics}
      slot="start"
      className={styles.iconStart}
      color="primary"
    />
    <IonLabel>{similarityFunction.name}</IonLabel>
    <IonButton onClick={openEditFunctionBuilder} color="primary">
      <IonIcon icon={create} />
    </IonButton>
    <IonButton onClick={previewSimilarityFunction} color="dark">
      <IonIcon icon={telescope} />
    </IonButton>
    <IonButton onClick={deleteFunction} color="danger">
      <IonIcon icon={trash} />
    </IonButton>
  </IonItem>
);

export default SimilarityFunctionItemView;
