import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import {
  EntityItemOwnProps,
  EntityItemStateProps,
} from 'components/simple/EntityItem/EntityItemProps';

export type GenericEntityItem = (
  state: SnowmanAppModel,
  ownProps: EntityItemOwnProps
) => EntityItemStateProps;
