import { IonPopover } from '@ionic/react';
import SelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroup';
import { SelectorPopoverGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroupProps';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import React from 'react';
import { Provider } from 'react-redux';

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
      <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
        {children ? children(close) : null}
      </Provider>
    </IonPopover>
  </>
);

export default SelectorPopoverGroupView;
