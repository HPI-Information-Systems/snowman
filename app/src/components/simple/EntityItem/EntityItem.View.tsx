import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import styles from 'components/simple/EntityItem/EntityItemStyles.module.css';
import { entityItemIcon } from 'components/simple/EntityItem/EntityItemType';
import { openOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import useTooltip from 'utils/useTooltipHook';

const EntityItemView = ({
  name,
  openItem,
  tooltip,
  itemType,
}: EntityItemProps): JSX.Element => {
  useTooltip();
  const [open, setOpen] = useState(true);

  return (
    <IonItem
      color="clear"
      lines="none"
      className={styles.lessPadding}
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
          icon={open ? entityItemIcon[itemType] : openOutline}
          color="primarydark"
          size="small"
        />
      </IonButton>
      <IonLabel className={styles.paddingLeft}>{name}</IonLabel>
    </IonItem>
  );
};

export default EntityItemView;
