import {
  hideLoading,
  showLoading,
} from 'apps/SnowmanApp/store/ActionLogicActions';
import {
  closeDialog,
  navigateTo,
  openDialog,
} from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { ViewIDs } from 'types/ViewIDs';

export const doNavigateTo = (aTarget: ViewIDs): void => {
  SnowmanAppDispatch(navigateTo(aTarget));
};
export const doOpenDialog = (aDialog: ViewIDs, entityId?: number): void => {
  SnowmanAppDispatch(openDialog(aDialog, entityId));
};
export const doCloseDialog = (): void => {
  SnowmanAppDispatch(closeDialog());
};
export const doShowBlockingLoading = (): void => {
  SnowmanAppDispatch(showLoading());
};
export const doHideBlockingLoading = (): void => {
  SnowmanAppDispatch(hideLoading());
};
