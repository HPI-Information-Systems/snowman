import { GenericInstanceOwnProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericInstanceProps';
import { SideMenuProps } from 'apps/SnowmanApp/components/GenericSubInstance/SideMenuProps';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { FC } from 'react';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { ViewIDs } from 'types/ViewIDs';

export interface GenericSubAppStateProps {
  activeApp: ViewIDs;
  centralResources: CentralResourcesModel;
}

export interface GenericSubAppOwnProps extends GenericInstanceOwnProps {
  appTitle: string;
  sideMenu?: FC<SideMenuProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sideMenuDisabledSelector?: (state: any) => boolean;
  usePageStruct?: boolean;
  onCentralResourcesRefreshed?: (
    resources: CentralResourcesModel
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => SnowmanThunkAction<void, any>;
}

export type GenericSubAppProps = GenericSubAppOwnProps &
  GenericSubAppStateProps;
