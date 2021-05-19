import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ViewIDs } from 'types/ViewIDs';
import { sanitize } from 'utils/sanitizeHtml';

export const DatasetEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const dataset = state.CentralResourcesStore.datasets.find(
      ({ id }) => id === ownProps.itemId
    );
    return {
      openItem: () => doOpenDialog(ViewIDs.DatasetDialog, ownProps.itemId),
      name: dataset?.name ?? '',
      tooltip: dataset
        ? `<b><i>${sanitize(dataset.name)}</i></b>` +
          '<p />' +
          sanitize(dataset.description)
        : '',
    };
  }
);
