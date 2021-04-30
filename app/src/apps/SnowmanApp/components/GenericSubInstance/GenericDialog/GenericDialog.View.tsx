import { IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { GenericDialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogProps';
import styles from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/GenericDialogStyles.module.css';
import { centralResourcesRefreshed } from 'apps/SnowmanApp/store/CentralResourcesGenericActions';
import { closeOutline } from 'ionicons/icons';
import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import style from 'theme/style';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

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
      !prevProps.isDialogOpen &&
      this.props.isDialogOpen &&
      this.props.onDialogOpen
    ) {
      this.props.onDialogOpen(
        this.store.dispatch,
        this.props.entityId,
        this.props.entityType
      );
    } else if (
      prevProps.isDialogOpen &&
      !this.props.isDialogOpen &&
      this.props.onDialogClose
    ) {
      this.props.onDialogClose(
        this.store.dispatch,
        prevProps.entityId,
        prevProps.entityType
      );
    }

    if (!isEqual(prevProps.centralResources, this.props.centralResources)) {
      centralResourcesRefreshed(
        this.store.dispatch as SnowmanDispatch<unknown>,
        this.props.centralResources
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
