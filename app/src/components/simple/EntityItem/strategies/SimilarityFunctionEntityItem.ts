import { resolveEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/filter';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const SimilarityFunctionEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const func = state.CentralResourcesStore.simFunctionsMap[ownProps.itemId];
    const experiment = resolveEntity(
      func?.experimentId,
      state.CentralResourcesStore.experimentsMap
    );

    return {
      openItem: () =>
        doOpenDialog(ViewIDs.FunctionBuilderDialog, ownProps.itemId),
      name: func?.name ?? '',
      tooltip: func
        ? `<b><i>${sanitize(func.name)}</i></b>` +
          '<p />' +
          `<b>Experiment:</b> ${sanitize(experiment?.name) ?? '?'}`
        : '',
    };
  }
);
