import { IonButton, IonButtons } from '@ionic/react';
import TabBarConfig, { TabBarConfigItem } from 'components/TabBar/TabBarConfig';
import { TabBarProps } from 'components/TabBar/TabBarProps';
import styles from 'components/TabBar/TabBarStyles.module.css';
import React from 'react';
import style from 'theme/style';

const TabBarView = ({ openSubApp, activeSubApp }: TabBarProps): JSX.Element => (
  <div className={styles.toolbar}>
    <div className={styles.toolbarContainer}>
      <IonButtons slot="start" class={styles.buttonContainer}>
        {TabBarConfig.map(
          (aTabConfigItem: TabBarConfigItem): JSX.Element => (
            <IonButton
              key={aTabConfigItem.viewID}
              fill="clear"
              size="large"
              className={
                activeSubApp === aTabConfigItem.viewID
                  ? style(styles.buttonElement, styles.active)
                  : style(styles.buttonElement)
              }
              onClick={(): void => openSubApp(aTabConfigItem.viewID)}
            >
              {aTabConfigItem.title}
            </IonButton>
          )
        )}
      </IonButtons>
    </div>
  </div>
);

export default TabBarView;
