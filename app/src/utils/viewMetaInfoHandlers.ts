import { ImmediateStore, RenderLogicStore } from 'store/models';
import { store } from 'store/store';
import { ViewIDs } from 'types/ViewIDs';
import { ViewComponent, ViewMetaInformation } from 'types/ViewMetaInformation';
import {
  PrimaryViewMetaInformation,
  ViewMetaInformationCollection,
} from 'utils/ViewMetaInformationCollection';

const getMetaInfoOfViewId = (aViewId: ViewIDs): ViewMetaInformation =>
  ViewMetaInformationCollection.find(
    (aViewMetaInfo: ViewMetaInformation): boolean =>
      aViewMetaInfo.key === aViewId
  ) ?? PrimaryViewMetaInformation;

export const getMetaInfoOfCurrentView = (
  aRenderLogicStore?: RenderLogicStore
): ViewMetaInformation =>
  getMetaInfoOfViewId(
    (aRenderLogicStore ?? store.getState().RenderLogicStore).currentViewID
  );

export const getNextViewId = (aRenderLogicStore?: RenderLogicStore): ViewIDs =>
  getMetaInfoOfCurrentView(aRenderLogicStore).nextView;

export const couldNavigateToView = (
  aViewId: ViewIDs,
  qualifyingState: ImmediateStore
): boolean => getMetaInfoOfViewId(aViewId).accessGuard(qualifyingState);

export const getViewComponentToViewId = (aViewId: ViewIDs): ViewComponent =>
  getMetaInfoOfViewId(aViewId).component;
