import { FC, LazyExoticComponent } from 'react';
import { ImmediateStore } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';

export interface SideMenuProps {
  contentId: string;
}

export type ViewComponent = FC<unknown>;

export interface ViewMetaInformation {
  key: ViewIDs;
  component: ViewComponent;
  hideSideMenu?: boolean;
  accessGuard(aState: ImmediateStore): boolean;
}
