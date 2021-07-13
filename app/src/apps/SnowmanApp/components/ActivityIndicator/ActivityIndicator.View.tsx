import { IonIcon, IonSpinner } from '@ionic/react';
import { ActivityIndicatorProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import styles from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorStyles.module.css';
import { refreshOutline } from 'ionicons/icons';
import React from 'react';

const ActivityIndicatorView = ({
  existsActiveRequest,
  triggerRefresh,
}: ActivityIndicatorProps): JSX.Element => (
  <>
    {existsActiveRequest ? (
      <IonSpinner className={styles.spinnerWhite} />
    ) : (
      <IonIcon
        icon={refreshOutline}
        slot="icon-only"
        size="large"
        className={styles.buttonWhite}
        onClick={triggerRefresh}
      />
    )}
  </>
);

export default ActivityIndicatorView;
