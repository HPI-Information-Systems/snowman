import { FC } from 'react';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { SideMenuProps } from 'types/ViewMetaInformation';

export interface GenericSubAppOwnProps {
  appTitle: string;
  sideMenu?: FC<SideMenuProps>;
  children?: JSX.Element | JSX.Element[];
  createSubAppStore(): Store<unknown, SnowmanAction>;
}

export interface GenericSubAppStateProps {
  existsActiveRequest: boolean;
}

export type GenericSubAppProps = GenericSubAppOwnProps &
  GenericSubAppStateProps;
