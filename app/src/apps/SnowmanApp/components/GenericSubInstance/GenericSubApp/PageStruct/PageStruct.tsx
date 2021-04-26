import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ActivityIndicator from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator';
import { ActivityIndicator2 } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.Container';
import { PageStructProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStructProps';
import styles from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStructStyles.module.css';
import React from 'react';

const PageStruct = ({ pageTitle, children }: PageStructProps): JSX.Element => (
  <>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{pageTitle}</IonTitle>
        <div slot="end" className={styles.spinnerContainer}>
          <ActivityIndicator2 />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">{children}</IonContent>
  </>
);

export default PageStruct;
