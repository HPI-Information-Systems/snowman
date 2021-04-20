import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { GenericInstanceOwnProps } from 'components/GenericSubInstance/GenericInstanceProps';
import { SideMenuProps } from 'components/GenericSubInstance/SideMenuProps';
import { FC } from 'react';
import { ViewIDs } from 'types/ViewIDs';

export interface GenericSubAppStateProps {
  existsActiveRequest: boolean;
  activeApp: ViewIDs;
  centralResources: CentralResourcesModel;
}

export interface GenericSubAppOwnProps extends GenericInstanceOwnProps {
  appTitle: string;
  sideMenu?: FC<SideMenuProps>;
}

export type GenericSubAppProps = GenericSubAppOwnProps &
  GenericSubAppStateProps;
