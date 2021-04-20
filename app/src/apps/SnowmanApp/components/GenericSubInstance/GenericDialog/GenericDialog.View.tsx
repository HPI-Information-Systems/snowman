import { IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { GenericDialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogProps';
import styles from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogStyles.module.css';
import { closeOutline } from 'ionicons/icons';
import React, { Component, Dispatch } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import style from 'theme/style';

class GenericDialogView extends Component<GenericDialogProps> {
  store: Store<unknown, SnowmanAction>;

  static defaultProps = {
    provideScrollingMechanism: true,
  };

  constructor(props: GenericDialogProps) {
    super(props);
    this.store = props.createSubAppStore();
  }

  componentDidUpdate(prevProps: Readonly<GenericDialogProps>): void {
    if (
      !this.props.isAddDialog &&
      this.props.entityId &&
      this.props.isDialogOpen &&
      this.props.loadInitialState
    ) {
      this.props.loadInitialState(
        this.store.dispatch as Dispatch<unknown>,
        this.props.entityId
      );
    }
  }

  render(): JSX.Element {
    return (
      <Provider store={this.store}>
        <IonModal
          isOpen={this.props.isDialogOpen}
          onDidDismiss={this.props.closeDialog}
        >
          <div className={styles.outerContainer}>
            <IonToolbar color="primarydark" className={styles.toolbar}>
              <IonTitle slot="start">
                {this.props.getHeading(this.props.entityId)}
              </IonTitle>
              <IonIcon
                icon={closeOutline}
                slot="end"
                className={styles.modalCloseIcon}
                size="large"
                onClick={this.props.closeDialog}
              />
            </IonToolbar>
            <div
              className={style(
                styles.innerContainer,
                this.props.provideScrollingMechanism
                  ? styles.innerContainerScrollable
                  : styles.innerContainerNoScroll
              )}
            >
              {this.props.children({
                entityId: this.props.entityId,
                isAddDialog: this.props.isAddDialog,
              })}
            </div>
          </div>
        </IonModal>
      </Provider>
    );
  }
}

export default GenericDialogView;
