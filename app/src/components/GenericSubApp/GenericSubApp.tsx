import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { GenericSubAppProps } from 'components/GenericSubApp/GenericSubAppProps';
import React, { createElement, useRef } from 'react';
import { Provider } from 'react-redux';

const GenericSubApp = ({
  existsActiveRequest,
  appTitle,
  sideMenu,
  children,
  createSubAppStore,
  activeApp,
  appId,
}: GenericSubAppProps): JSX.Element => {
  const storeRef = useRef(createSubAppStore());
  return (
    <Provider store={storeRef.current}>
      {activeApp === appId ? (
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <IonSplitPane
            when="lg"
            contentId="mainViewContentId"
            class="split-pane-fixed"
          >
            {sideMenu !== undefined
              ? createElement(sideMenu, { contentId: 'mainViewContentId' })
              : null}
            {/* Page Content */}
            <IonPage id="mainViewContentId">
              <IonHeader>
                <IonToolbar color="primary">
                  <IonButtons slot="start">
                    <IonMenuButton />
                  </IonButtons>
                  <IonTitle>{appTitle}</IonTitle>
                  <div slot="end" className="spinner-container">
                    {existsActiveRequest ? (
                      <IonSpinner className="spinner-white" />
                    ) : null}
                  </div>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">{children}</IonContent>
            </IonPage>
          </IonSplitPane>
        </div>
      ) : null}
    </Provider>
  );
};

export default GenericSubApp;
