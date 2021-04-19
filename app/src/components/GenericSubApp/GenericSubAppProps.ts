import { FC } from 'react';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { ViewIDs } from 'types/ViewIDs';
import { SideMenuProps } from 'types/ViewMetaInformation';

export interface GenericSubAppStateProps {
  existsActiveRequest: boolean;
  activeApp: ViewIDs;
}

export interface GenericSubAppOwnProps {
  appTitle: string;
  appId: ViewIDs;
  sideMenu?: FC<SideMenuProps>;
  children?: JSX.Element | JSX.Element[];
  createSubAppStore(): Store<unknown, SnowmanAction>;
}

export type GenericSubAppProps = GenericSubAppOwnProps &
  GenericSubAppStateProps;
