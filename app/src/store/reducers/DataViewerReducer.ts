import { ExperimentIntersection } from 'api';
import { DataViewerStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { DataViewerStore } from 'store/models';
import { getEmptyExperimentIntersection } from 'utils/experimentIntersectionFactory';

const initialState: DataViewerStore = {
  dataToShow: getEmptyExperimentIntersection(),
};

export const DataViewerReducer = (
  state: DataViewerStore = initialState,
  action: SnowmanAction
): DataViewerStore => {
  switch (action.type) {
    case actionTypes.RESET_DATA_VIEWER:
      return initialState;
    case actionTypes.RELOAD_TUPLES:
      return {
        ...state,
        dataToShow: {
          ...state.dataToShow,
          header: (action.payload as ExperimentIntersection).header,
          data: [
            ...state.dataToShow.data,
            ...(action.payload as ExperimentIntersection).data,
          ],
        },
      };
    default:
      return state;
  }
};
