import { FC, LazyExoticComponent } from 'react';
import { ImmediateStore } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';

export type ViewComponent = LazyExoticComponent<FC<unknown>> | FC;

export interface ViewMetaInformation {
  key: ViewIDs;
  component: ViewComponent;
  hideSideMenu?: boolean;
  accessGuard(aState: ImmediateStore): boolean;
}
