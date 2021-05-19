import { resolveEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const ExperimentEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const experiment =
      state.CentralResourcesStore.experimentsMap[ownProps.itemId];
    const dataset = resolveEntity(
      experiment?.datasetId,
      state.CentralResourcesStore.datasetsMap
    );
    const algorithm = resolveEntity(
      experiment?.algorithmId,
      state.CentralResourcesStore.algorithmsMap
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
