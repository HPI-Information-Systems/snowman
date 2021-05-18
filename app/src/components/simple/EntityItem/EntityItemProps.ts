import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface EntityItemOwnProps extends GenericStoreComponentProps {
  itemType: EntityItemType;
  itemId: number;
}

export interface EntityItemStateProps {
  openItem: () => void;
  tooltip: string;
  icon: string;
  name: string;
}

export type EntityItemProps = EntityItemOwnProps & EntityItemStateProps;
