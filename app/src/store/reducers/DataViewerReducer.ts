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
    default:
      return state;
  }
};
