import { GenericInstanceOwnProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericInstanceProps';
import { SideMenuProps } from 'apps/SnowmanApp/components/GenericSubInstance/SideMenuProps';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { FC } from 'react';
import { ViewIDs } from 'types/ViewIDs';

export interface GenericSubAppStateProps {
  activeApp: ViewIDs;
  centralResources: CentralResourcesModel;
}

export interface GenericSubAppOwnProps extends GenericInstanceOwnProps {
  appTitle: string;
  sideMenu?: FC<SideMenuProps>;
  bringOwnPageStruct?: boolean;
}

export type GenericSubAppProps = GenericSubAppOwnProps &
  GenericSubAppStateProps;
