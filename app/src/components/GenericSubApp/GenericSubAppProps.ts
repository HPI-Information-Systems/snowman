import { SnowmanPublicState } from 'app/SnowmanPublicState';
import { FC } from 'react';
import { Store } from 'redux';
import { SnowmanAction } from 'store/messages';
import { ViewIDs } from 'types/ViewIDs';
import { SideMenuProps } from 'types/ViewMetaInformation';

export interface GenericSubAppProps extends SnowmanPublicState {
  appTitle: string;
  appId: ViewIDs;
  sideMenu?: FC<SideMenuProps>;
  children?: JSX.Element | JSX.Element[];
  createSubAppStore(): Store<unknown, SnowmanAction>;
}
