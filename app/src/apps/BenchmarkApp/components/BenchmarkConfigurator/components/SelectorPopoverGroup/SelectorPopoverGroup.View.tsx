import { IonPopover } from '@ionic/react';
import SelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroup';
import { SelectorPopoverGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import React from 'react';

const SelectorPopoverGroupView = ({
  close,
  open,
  event,
  isOpen,
  items,
  children,
}: SelectorPopoverGroupProps): JSX.Element => (
  <>
    <SelectorGroup items={items} onClick={(event) => open(event.nativeEvent)} />
    <IonPopover isOpen={isOpen} event={event} onDidDismiss={() => close()}>
      {children}
    </IonPopover>
  </>
);

export default SelectorPopoverGroupView;
