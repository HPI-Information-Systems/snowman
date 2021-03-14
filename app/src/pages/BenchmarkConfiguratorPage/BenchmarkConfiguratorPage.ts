import { Experiment } from 'api';
import BenchmarkConfiguratorPageView from 'pages/BenchmarkConfiguratorPage/BenchmarkConfiguratorPage.View';
import {
  BenchmarkConfiguratorPageDispatchProps,
  BenchmarkConfiguratorPageStateProps,
} from 'pages/BenchmarkConfiguratorPage/BenchmarkConfiguratorPageProps';
import { connect } from 'react-redux';
import {
  setAvailableExperiments,
  setSelectedExperiments,
  setSelectedGoldstandards,
} from 'store/actions/BenchmarkConfigActions';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { store } from 'store/store';
import { MagicNotPossibleId } from 'structs/constants';
import { IonReorderEvent } from 'types/IonReorderEvent';
import { ViewIDs } from 'types/ViewIDs';
import { couldEnterBinaryMetricsPage } from 'utils/navigationGuards';

const mapStateToProps = (
  state: Store
): BenchmarkConfiguratorPageStateProps => ({
  experimentResolution: new Map(
    state.ExperimentsStore.experiments.map((anExp: Experiment) => [
      anExp.id,
      anExp.name,
    ])
  ),
  availableExperiments: state.BenchmarkConfigStore.availableExperiments,
  selectedExperiments: state.BenchmarkConfigStore.selectedExperiments,
  selectedGoldstandards: state.BenchmarkConfigStore.selectedGoldstandards,
  couldEnterBinaryMetricsPage: couldEnterBinaryMetricsPage(state),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): BenchmarkConfiguratorPageDispatchProps => ({
  enterBinaryMetricsPage: () => {
    dispatch(navigateTo(ViewIDs.BINARY_METRICS));
  },
  resetReorder: () => {
    dispatch(setSelectedExperiments([]));
    dispatch(setSelectedGoldstandards([]));
    dispatch(
      setAvailableExperiments(
        store.getState().ExperimentsStore.selectedExperiments
      )
    );
  },
  handleReorder: (event: IonReorderEvent) => {
    if (event.detail.to === 0) {
      event.detail.complete(false);
      return;
    }
    //console.log(event.detail.from, event.detail.to);

    const spacer = MagicNotPossibleId;
    let list = [
      spacer,
      ...store.getState().BenchmarkConfigStore.selectedGoldstandards,
      spacer,
      ...store.getState().BenchmarkConfigStore.selectedExperiments,
      spacer,
      ...store.getState().BenchmarkConfigStore.availableExperiments,
    ];

    //console.log(list);
    list = event.detail.complete(list);
    //console.log(list);

    const splitPoints = list.reduce(
      (output: number[], element: number, index: number) => {
        if (element === spacer) output.push(index);
        return output;
      },
      []
    );
    if (splitPoints.length !== 3)
      // this is impossible
      throw Error('unexpected split count - it should be spacer count');

    dispatch(
      setSelectedGoldstandards(list.slice(splitPoints[0] + 1, splitPoints[1]))
    );
    dispatch(
      setSelectedExperiments(list.slice(splitPoints[1] + 1, splitPoints[2]))
    );
    dispatch(
      setAvailableExperiments(list.slice(splitPoints[2] + 1, list.length))
    );
  },
});

const BenchmarkConfiguratorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchmarkConfiguratorPageView);

export default BenchmarkConfiguratorPage;
