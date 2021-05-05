import {
  hideLoading,
  showLoading,
} from 'apps/SnowmanApp/store/ActionLogicActions';
import {
  closeDialog,
  navigateTo,
  openDialog,
  returnToPreviousDialog,
} from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { ViewIDs } from 'types/ViewIDs';

export const doNavigateTo = (aTarget: ViewIDs): void => {
  SnowmanAppDispatch(navigateTo(aTarget));
};
export const doOpenDialog = (
  aDialog: ViewIDs,
  entityId?: number,
  entityType?: string
): void => {
  SnowmanAppDispatch(openDialog(aDialog, entityId, entityType));
};
export const doCloseDialog = (): void => {
  SnowmanAppDispatch(closeDialog());
};
export const doReturnToPreviousDialog = (): void => {
  SnowmanAppDispatch(returnToPreviousDialog());
};
export const doShowBlockingLoading = (): void => {
  SnowmanAppDispatch(showLoading());
};
export const doHideBlockingLoading = (): void => {
  SnowmanAppDispatch(hideLoading());
};
