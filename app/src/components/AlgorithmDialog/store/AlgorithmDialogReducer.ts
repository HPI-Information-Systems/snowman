import { AlgorithmDialogActionTypes } from 'components/AlgorithmDialog/types/AlgorithmDialogActionTypes';
import { AlgorithmDialogModel } from 'components/AlgorithmDialog/types/AlgorithmDialogModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: AlgorithmDialogModel = {
  algorithmName: '',
  algorithmDescription: '',
};

const AlgorithmDialogReducer = (
  state: AlgorithmDialogModel = initialState,
  action: SnowmanAction
): AlgorithmDialogModel => {
  switch (action.type) {
    case AlgorithmDialogActionTypes.CHANGE_ALGORITHM_NAME:
      return {
        ...state,
        algorithmName: action.payload as string,
      };
    case AlgorithmDialogActionTypes.CHANGE_ALGORITHM_DESCRIPTION:
      return {
        ...state,
        algorithmDescription: action.payload as string,
      };
    case AlgorithmDialogActionTypes.RESET_DIALOG:
      return initialState;
    default:
      return state;
  }
};

export default AlgorithmDialogReducer;
