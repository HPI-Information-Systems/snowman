import { IonBackdrop } from '@ionic/react';
import { ErroneousBackdropProps } from 'components/simple/ErroneousBackdrop/ErroneousBackdropProps';
import styles from 'components/simple/ErroneousBackdrop/ErroneousBackdropStyles.module.css';
import React from 'react';

const ErroneousBackdrop = ({
  shouldShow,
  message,
}: ErroneousBackdropProps): JSX.Element => (
  <>
    {shouldShow ? (
      <>
        <div className={styles.errorOverlay}>{message}</div>
        <IonBackdrop tappable={false} className={styles.heavyBackdrop} />
      </>
    ) : null}
  </>
);

export default ErroneousBackdrop;
