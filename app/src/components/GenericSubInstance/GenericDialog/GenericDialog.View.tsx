import { IonIcon, IonModal, IonText } from '@ionic/react';
import { GenericDialogProps } from 'components/GenericSubInstance/GenericDialog/GenericDialogProps';
import styles from 'components/ModalDialog/ModalDialogStyles.module.css';
import { closeOutline } from 'ionicons/icons';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';

const margin = 15;
const fontSize = '2rem';

class GenericDialogView extends Component<GenericDialogProps> {
  store: Store<unknown, SnowmanAction>;

  static defaultProps = {
    provideScrollingMechanism: true,
  };

  constructor(props: GenericDialogProps) {
    super(props);
    this.store = props.createSubAppStore();
  }
  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        <IonModal
          isOpen={this.props.isDialogOpen}
          onDidDismiss={this.props.closeDialog}
        >
          <div
            className="modal-content"
            style={{
              marginTop: `${margin}px`,
              overflowY: this.props.provideScrollingMechanism
                ? 'auto'
                : 'hidden',
              height: this.props.provideScrollingMechanism ? 'auto' : `100%`,
            }}
          >
            <IonText color="dark">
              <h1
                className={styles.center}
                style={{
                  marginTop: `${margin}px`,
                  marginBottom: `${margin}px`,
                  fontSize,
                }}
              >
                {this.props.heading}
              </h1>
              <IonIcon
                icon={closeOutline}
                className={styles.modalCloseIcon}
                size="large"
                onClick={this.props.closeDialog}
              />
            </IonText>
            <div
              style={{
                position: 'relative',
                height: this.props.provideScrollingMechanism
                  ? 'auto'
                  : `calc(100% - ${fontSize} - ${3 * margin}px)`,
              }}
            >
              {this.props.children}
            </div>
          </div>
        </IonModal>
      </Provider>
    );
  }
}

export default GenericDialogView;
