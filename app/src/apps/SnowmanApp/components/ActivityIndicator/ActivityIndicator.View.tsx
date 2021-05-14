import { IonSpinner } from '@ionic/react';
import { ActivityIndicatorProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import styles from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorStyles.module.css';
import React from 'react';

const ActivityIndicatorView = ({
  existsActiveRequest,
}: ActivityIndicatorProps): JSX.Element => (
  <>
    {existsActiveRequest ? (
      <IonSpinner className={styles.spinnerWhite} />
    ) : null}
  </>
);

export default ActivityIndicatorView;
