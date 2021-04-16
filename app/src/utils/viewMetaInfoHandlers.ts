import { ImmediateStore } from 'store/models';
import {
  PrimaryViewMetaInformation,
  ViewMetaInformationCollection,
} from 'structs/viewMetaInfoCollection';
import { ViewIDs } from 'types/ViewIDs';
import { ViewComponent, ViewMetaInformation } from 'types/ViewMetaInformation';

const getMetaInfoOfViewId = (aViewId: ViewIDs): ViewMetaInformation =>
  ViewMetaInformationCollection.find(
    (aViewMetaInfo: ViewMetaInformation): boolean =>
      aViewMetaInfo.key === aViewId
  ) ?? PrimaryViewMetaInformation;

export const couldNavigateToView = (
  aViewId: ViewIDs,
  qualifyingState: ImmediateStore
): boolean => getMetaInfoOfViewId(aViewId).accessGuard(qualifyingState);

export const getViewComponentToViewId = (aViewId: ViewIDs): ViewComponent =>
  getMetaInfoOfViewId(aViewId).component;
