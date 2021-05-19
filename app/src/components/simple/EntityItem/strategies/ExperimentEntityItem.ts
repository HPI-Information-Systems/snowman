import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const ExperimentEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const experiment = state.CentralResourcesStore.experiments.find(
      ({ id }) => id === ownProps.itemId
    );
    const dataset = state.CentralResourcesStore.datasets.find(
      ({ id }) => id === experiment?.datasetId
    );
    const algorithm = state.CentralResourcesStore.algorithms.find(
      ({ id }) => id === experiment?.algorithmId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.ExperimentDialog, ownProps.itemId),
      name: experiment?.name ?? '',
      tooltip: experiment
        ? `<b><i>${sanitize(experiment.name)}</i></b>` +
          '<p />' +
          sanitize(experiment.description) +
          '<p />' +
          `<b>Dataset:</b> ${sanitize(dataset?.name) ?? '?'}` +
          '<br />' +
          `<b>Algorithm:</b> ${sanitize(algorithm?.name) ?? '?'}`
        : '',
    };
  }
);
