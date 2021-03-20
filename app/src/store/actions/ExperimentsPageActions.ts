import { Algorithm } from 'api';
import { DropResult } from 'react-beautiful-dnd';
import { ExperimentsPageActionTypes } from 'store/actions/actionTypes';
import { getDndDescriptorFromDropResult } from 'utils/dragNDropHelpers';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const clickOnMatchingSolution = (
  aMatchingSolution: Algorithm
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentsPageActionTypes.CLICK_ON_MATCHING_SOLUTION,
    payload: aMatchingSolution,
  });

export const dragNDropAnExperiment = (
  aDropResult: DropResult
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT,
    payload: getDndDescriptorFromDropResult(aDropResult),
  });
