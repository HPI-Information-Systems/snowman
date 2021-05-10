import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import BinaryMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import IntersectionConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/IntersectionConfigurator';
import NMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
import { KPIDiagramConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import React from 'react';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Configurator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <BinaryMetricsConfigurator />
      <NMetricsConfigurator />
      <IntersectionConfigurator />
      <KPIDiagramConfigurator />
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
