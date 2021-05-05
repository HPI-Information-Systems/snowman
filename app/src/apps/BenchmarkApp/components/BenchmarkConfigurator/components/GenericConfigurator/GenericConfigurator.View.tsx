import { GenericConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfiguratorProps';
import React from 'react';

const GenericConfiguratorView = ({
  children,
  isVisible,
}: GenericConfiguratorProps): JSX.Element => <>{isVisible ? children : null}</>;

export default GenericConfiguratorView;
