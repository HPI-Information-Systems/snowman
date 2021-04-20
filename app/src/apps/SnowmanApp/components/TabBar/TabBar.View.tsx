import { IonButton, IonButtons } from '@ionic/react';
import {
  TabBarConfigItem,
  TabBarConfigLeft,
  TabBarConfigRight,
} from 'apps/SnowmanApp/components/TabBar/TabBarConfig';
import { TabBarProps } from 'apps/SnowmanApp/components/TabBar/TabBarProps';
import styles from 'apps/SnowmanApp/components/TabBar/TabBarStyles.module.css';
import React from 'react';
import style from 'theme/style';

const TabBarView = ({ openSubApp, activeSubApp }: TabBarProps): JSX.Element => {
  const renderButtonFor = (aTabConfigItem: TabBarConfigItem): JSX.Element => (
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
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarContainer}>
        <IonButtons slot="start" class={styles.buttonContainer}>
          {TabBarConfigLeft.map(renderButtonFor)}
        </IonButtons>
        <IonButtons slot="end" class={styles.buttonContainer}>
          {TabBarConfigRight.map(renderButtonFor)}
        </IonButtons>
      </div>
    </div>
  );
};

export default TabBarView;