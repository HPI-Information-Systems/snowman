import GenericBenchmarkStrategyView from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy.View';
import { GenericBenchmarkStrategyStateProps } from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategyProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: BenchmarkAppModel
): GenericBenchmarkStrategyStateProps => ({
  activeStrategy: state.activeStrategy,
  appStore: state.resources,
});

const GenericBenchmarkStrategy = connect(mapStateToProps)(
  GenericBenchmarkStrategyView
);

export default GenericBenchmarkStrategy;
