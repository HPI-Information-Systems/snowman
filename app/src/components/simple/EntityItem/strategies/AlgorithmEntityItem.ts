import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const AlgorithmEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const algorithm = state.CentralResourcesStore.algorithms.find(
      ({ id }) => id === ownProps.itemId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.AlgorithmDialog, ownProps.itemId),
      name: algorithm?.name ?? '',
      tooltip: algorithm
        ? `<b><i>${sanitize(algorithm.name)}</i></b>` +
          '<p />' +
          sanitize(algorithm.description)
        : '',
    };
  }
);
