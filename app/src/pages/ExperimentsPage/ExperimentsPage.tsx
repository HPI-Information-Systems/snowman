import { Algorithm, Experiment } from 'api';
import { xor } from 'lodash';
import ExperimentsPageView from 'pages/ExperimentsPage/ExperimentsPage.View';
import {
  ExperimentsPageDispatchProps,
  ExperimentsPageStateProps,
} from 'pages/ExperimentsPage/ExperimentsPageProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/ExperimentDialogStoreActions';
import {
  clickOnExperiment,
  clickOnExperimentTag,
  deleteExperiment,
  getExperiments,
} from 'store/actions/ExperimentsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { Option } from 'types/Option';
import { getAlgorithmTagFromId } from 'utils/algorithmHelpers';

const mapStateToProps = (state: Store): ExperimentsPageStateProps => ({
  matchingSolutions: state.AlgorithmsStore.algorithms.map(
    (anAlgorithm: Algorithm): string => anAlgorithm.name
  ),
  selectedMatchingSolutions: state.ExperimentsStore.selectedExperimentsTags,
  experiments: state.ExperimentsStore.experiments
    .filter(
      (anExperiment: Experiment): boolean =>
        anExperiment.datasetId === state.DatasetsStore.selectedDataset?.id
    )
    .filter((anExperiment: Experiment): boolean =>
      state.ExperimentsStore.selectedExperimentsTags.length === 0
        ? true
        : xor(
            [
              getAlgorithmTagFromId(
                anExperiment.algorithmId,
                state.AlgorithmsStore.algorithms
              ),
            ],
            state.ExperimentsStore.selectedExperimentsTags
          ).length === 0
    )
    .map(
      (anExperiment: Experiment): Option => ({
        id: anExperiment.id,
        title: anExperiment.name,
        description: anExperiment.description,
        subtitle: getAlgorithmTagFromId(
          anExperiment.algorithmId,
          state.AlgorithmsStore.algorithms
        ).toUpperCase(),
        // ToDo: Fix bug that causes -1 (undefined)
        tags: [`Count: ${anExperiment.numberOfUploadedRecords}`],
      })
    ),
  selectedExperiments: state.ExperimentsStore.selectedExperiments,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentsPageDispatchProps => ({
  clickOnTag(aTag: string): void {
    dispatch(clickOnExperimentTag(aTag));
  },
  clickOnExperiment(anExperimentId: number): void {
    dispatch(clickOnExperiment(anExperimentId));
  },
  loadExperiments(): void {
    dispatch(getExperiments()).then();
  },
  deleteExperiment(anExperimentId: number): void {
    dispatch(deleteExperiment(anExperimentId)).then();
  },
  editExperiment(anExperimentId: number) {
    dispatch(openChangeDialog(anExperimentId)).then();
  },
});

const ExperimentsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsPageView);

export default ExperimentsPage;
