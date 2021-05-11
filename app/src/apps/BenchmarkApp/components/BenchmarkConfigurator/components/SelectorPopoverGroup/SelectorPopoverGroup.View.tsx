import { IonPopover } from '@ionic/react';
import SelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroup';
import { SelectorPopoverGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import styles from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupStyles.module.css';
import React from 'react';
const SelectorPopoverGroupView = ({
  close,
  show,
  eventPopover,
  isOpen,
  items,
  children,
}: SelectorPopoverGroupProps): JSX.Element => (
  <>
    <SelectorGroup items={items} onClick={(event) => show(event.nativeEvent)} />
    <IonPopover
      isOpen={isOpen}
      event={eventPopover}
      onDidDismiss={() => close()}
      cssClass={styles.largePopover}
    >
      <div className={styles.popoverContentPadding}>{children}</div>
    </IonPopover>
  </>
);

export default SelectorPopoverGroupView;
