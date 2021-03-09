import { SnowmanAction } from 'store/messages';
import { DataViewerStore } from 'store/models';

const initialState: DataViewerStore = {
  dataToShow: undefined,
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
