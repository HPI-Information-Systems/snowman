import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import BinaryMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import DecisionMatrixConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DecisionMatrixConfigurator';
import DefaultPlaceholderConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DefaultPlaceholderConfigurator';
import IntersectionConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/IntersectionConfigurator';
import NMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
import SimilarityDiagramConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SimilarityDiagramConfigurator';
import { KPIDiagramConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import React from 'react';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId} type="push">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Configurator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <DefaultPlaceholderConfigurator />
      <BinaryMetricsConfigurator />
      <NMetricsConfigurator />
      <IntersectionConfigurator />
      <KPIDiagramConfigurator />
      <DecisionMatrixConfigurator />
      <SimilarityDiagramConfigurator />
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
