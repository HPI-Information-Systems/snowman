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
import styles from 'components/GenericSubApp/GenericSubAppStyles.module.css';
import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';

class GenericSubApp extends Component<GenericSubAppProps> {
  store: Store<unknown, SnowmanAction>;

  constructor(props: GenericSubAppProps) {
    super(props);
    this.store = props.createSubAppStore();
  }
  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        {this.props.activeApp === this.props.appId ? (
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <IonSplitPane
              when="lg"
              contentId="mainViewContentId"
              class="split-pane-fixed"
            >
              {this.props.sideMenu !== undefined
                ? createElement(this.props.sideMenu, {
                    contentId: 'mainViewContentId',
                  })
                : null}
              {/* Page Content */}
              <IonPage id="mainViewContentId">
                <IonHeader>
                  <IonToolbar color="primary">
                    <IonButtons slot="start">
                      <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{this.props.appTitle}</IonTitle>
                    <div slot="end" className={styles.spinnerContainer}>
                      {this.props.existsActiveRequest ? (
                        <IonSpinner className={styles.spinnerWhite} />
                      ) : null}
                    </div>
                  </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                  {this.props.children}
                </IonContent>
              </IonPage>
            </IonSplitPane>
          </div>
        ) : null}
      </Provider>
    );
  }
}

export default GenericSubApp;
