import { FC, LazyExoticComponent } from 'react';
import { ImmediateStore } from 'store/models';
import { menuCategories } from 'types/MenuCategories';
import { SelectedOptionItem } from 'types/SelectedOptionItem';
import { ViewIDs } from 'types/ViewIDs';

export type ViewComponent = LazyExoticComponent<FC<unknown>> | FC;

export interface ViewMetaInformation {
  key: ViewIDs;
  component: ViewComponent;
  nextView: ViewIDs;
  shouldShowInMenu: boolean;
  menuCategory: menuCategories;
  menuName: string;
  menuIcon: string | null;
  // we use -1 if it does not matters
  menuSortKey: number;
  hideSideMenu?: boolean;

  accessGuard(aState: ImmediateStore): boolean;

  selectedOptionsReminder(aState: ImmediateStore): SelectedOptionItem[];
}
