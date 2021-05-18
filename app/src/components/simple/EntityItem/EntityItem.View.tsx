import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import styles from 'components/simple/EntityItem/EntityItemStyles.module.css';
import { openOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import useTooltip from 'utils/useTooltipHook';

const EntityItemView = ({
  icon,
  name,
  openItem,
  tooltip,
}: EntityItemProps): JSX.Element => {
  useTooltip();
  const [open, setOpen] = useState(true);

  return (
    <IonItem
      color="clear"
      lines="none"
      className={styles.lessPaddingLeft}
      data-for="tooltip"
      data-tip={tooltip}
    >
      <IonButton
        onMouseOver={() => setOpen(false)}
        onMouseOut={() => setOpen(true)}
        className={styles.noPadding}
        fill="clear"
        onClick={(e) => {
          openItem();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <IonIcon
          icon={open ? icon : openOutline}
          color="primarydark"
          size="small"
        />
      </IonButton>
      <IonLabel className={styles.paddingLeft}>{name}</IonLabel>
    </IonItem>
  );
};

export default EntityItemView;
