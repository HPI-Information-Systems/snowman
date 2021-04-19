import { ViewIDs } from 'types/ViewIDs';

export interface RenderLogicModel {
  currentViewID: ViewIDs;
  openedDialog: ViewIDs | null;
}
