import { showToast } from 'apps/SnowmanApp/store/ActionLogicActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { GenericEntityItem } from 'components/simple/EntityItem/strategies/GenericEntityItem';
import { assertType } from 'snowman-library';
import { ToastType } from 'types/ToastTypes';
import { ViewIDs } from 'types/ViewIDs';
import { isPredefinedAlgorithm } from 'utils/algorithmHelpers';
import { sanitize } from 'utils/sanitizeHtml';

export const AlgorithmEntityItem = assertType<GenericEntityItem>()(
  (state, ownProps) => {
    const algorithm =
      state.CentralResourcesStore.algorithmsMap[ownProps.itemId];
    return {
      openItem: () =>
        algorithm !== undefined && isPredefinedAlgorithm(algorithm)
          ? SnowmanAppDispatch(
              showToast(
                `${algorithm?.name} cannot be edited because it is a predefined matching solution.`,
                ToastType.Error
              )
            )
          : doOpenDialog(ViewIDs.AlgorithmDialog, ownProps.itemId),
      name: algorithm?.name ?? '',
      tooltip: algorithm
        ? `<b><i>${sanitize(algorithm.name)}</i></b>` +
          '<p />' +
          sanitize(algorithm.description)
        : '',
    };
  }
);
