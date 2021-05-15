import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ActivityIndicator from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator';
import { PageStructProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStructProps';
import styles from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStructStyles.module.css';
import React from 'react';

const PageStruct = ({
  pageTitle,
  children,
  enableScroll = true,
}: PageStructProps): JSX.Element => (
  <>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{pageTitle}</IonTitle>
        <div slot="end" className={styles.spinnerContainer}>
          <ActivityIndicator />
        </div>
      </IonToolbar>
    </IonHeader>
    <IonContent
      className="ion-padding"
      scrollX={enableScroll}
      scrollY={enableScroll}
    >
      {children}
    </IonContent>
  </>
);

export default PageStruct;
