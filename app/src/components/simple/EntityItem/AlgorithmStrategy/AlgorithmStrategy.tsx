import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Algorithm } from 'api';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import styles from 'components/simple/EntityItem/EntityItemStyles.module.css';
import { hardwareChip, openOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { ViewIDs } from 'types/ViewIDs';
import useTooltip from 'utils/useTooltipHook';

const AlgorithmStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  const [open, setOpen] = useState(true);
  return (
    <IonItem
      color="clear"
      lines="none"
      className={styles.lessPaddingLeft}
      data-for="tooltip"
      data-tip={item.description}
    >
      <IonButton
        onMouseOver={() => setOpen(false)}
        onMouseOut={() => setOpen(true)}
        className={styles.noPadding}
        fill="clear"
        onClick={(e) => {
          doOpenDialog(ViewIDs.AlgorithmDialog, item.id);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <IonIcon
          icon={open ? hardwareChip : openOutline}
          color="primarydark"
          size="small"
        />
      </IonButton>
      <IonLabel className={styles.paddingLeft}>
        {(item as Algorithm).name}
      </IonLabel>
    </IonItem>
  );
};

export default AlgorithmStrategy;
