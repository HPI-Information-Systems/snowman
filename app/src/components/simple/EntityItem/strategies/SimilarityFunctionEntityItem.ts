import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const SimilarityFunctionEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const func = state.CentralResourcesStore.simFunctions.find(
      ({ id }) => id === ownProps.itemId
    );
    const experiment = state.CentralResourcesStore.experiments.find(
      ({ id }) => func?.experimentId === id
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
