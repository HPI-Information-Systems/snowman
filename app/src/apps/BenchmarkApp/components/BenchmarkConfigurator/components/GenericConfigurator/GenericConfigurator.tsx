import GenericConfiguratorView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator.View';
import {
  GenericConfiguratorOwnProps,
  GenericConfiguratorStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfiguratorProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: GenericConfiguratorOwnProps
): GenericConfiguratorStateProps => ({
  isVisible: state.activeStrategy === ownProps.strategyID,
});

const GenericConfigurator = connect(mapStateToProps)(GenericConfiguratorView);

export default GenericConfigurator;
