import { IonList } from '@ionic/react';
import GroupInput from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInput';
import { GenericConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfiguratorProps';
import React from 'react';

const GenericConfiguratorView = ({
  cacheKey,
  isVisible,
}: GenericConfiguratorProps): JSX.Element => (
  <>
    {isVisible ? (
      <IonList>
        <GroupInput spreadItemsToParent={true} cacheKey={cacheKey} />
      </IonList>
    ) : null}
  </>
);

export default GenericConfiguratorView;
