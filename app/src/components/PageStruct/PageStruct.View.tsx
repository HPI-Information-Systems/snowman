import 'components/PageStruct/PageStructStyles.css';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { PageStructProps } from 'components/PageStruct/PageStructProps';
import React from 'react';

const PageStructView = ({
  title,
  children,
  showIndicator,
}: PageStructProps): React.FunctionComponentElement<PageStructProps> => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <div slot="end" className="spinner-container">
            {showIndicator ? <IonSpinner className="spinner-white" /> : null}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{children}</IonContent>
    </>
  );
};

export default PageStructView;
