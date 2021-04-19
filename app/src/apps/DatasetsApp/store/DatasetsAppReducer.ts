import { DatasetsAppActionsTypes } from 'apps/DatasetsApp/types/DatasetsAppActionTypes';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: DatasetsAppModel = {
  selectedTags: [],
};

const DatasetsAppReducer = (
  state: DatasetsAppModel = initialState,
  action: SnowmanAction
): DatasetsAppModel => {
  switch (action.type) {
    case DatasetsAppActionsTypes.TOGGLE_TAG:
      return {
        ...state,
        selectedTags: state.selectedTags.includes(action.payload as string)
          ? state.selectedTags.filter(
              (value: string): boolean => value !== (action.payload as string)
            )
          : [...state.selectedTags, action.payload as string],
      };
    default:
      return state;
  }
};

export default DatasetsAppReducer;
