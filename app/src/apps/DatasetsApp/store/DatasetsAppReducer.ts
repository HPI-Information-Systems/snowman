import { DatasetsAppActionsTypes } from 'apps/DatasetsApp/types/DatasetsAppActionTypes';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { intersection } from 'lodash';
import { SnowmanAction } from 'types/SnowmanAction';
import { getTagsFromDatasets } from 'utils/tagFactory';

const initialState: DatasetsAppModel = {
  selectedTags: [],
};

const DatasetsAppReducer = (
  state: DatasetsAppModel = initialState,
  action: SnowmanAction
): DatasetsAppModel => {
  switch (action.type) {
    case CentralResourcesGenericActionsTypes.REFRESHED:
      return {
        ...state,
        selectedTags: intersection(
          state.selectedTags,
          getTagsFromDatasets(
            (action.payload as CentralResourcesModel).datasets
          )
        ),
      };
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
