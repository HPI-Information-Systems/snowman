import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { Dataset } from 'api';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { EntityItemProps } from 'components/simple/EntityItem/EntityItemProps';
import styles from 'components/simple/EntityItem/EntityItemStyles.module.css';
import { fileTrayFull, openOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { ViewIDs } from 'types/ViewIDs';
import useTooltip from 'utils/useTooltipHook';

const DatasetStrategy = ({ item }: EntityItemProps): JSX.Element => {
  useTooltip();
  const [open, setOpen] = useState(true);
  return (
    <IonItem
      color="clear"
      className={styles.lessPaddingLeft}
      onMouseOver={() => setOpen(false)}
      onMouseOut={() => setOpen(true)}
      data-tip={item.description}
      lines="none"
    >
      <IonButton
        onClick={(e) => {
          doOpenDialog(ViewIDs.DatasetDialog, item.id);
          e.preventDefault();
          e.stopPropagation();
        }}
        className={styles.noPadding}
        fill="clear"
      >
        <IonIcon
          icon={open ? fileTrayFull : openOutline}
          color="primarydark"
          size="small"
        />
      </IonButton>
      <IonLabel className={styles.paddingLeft}>
        {(item as Dataset).name}
      </IonLabel>
    </IonItem>
  );
};

export default DatasetStrategy;
