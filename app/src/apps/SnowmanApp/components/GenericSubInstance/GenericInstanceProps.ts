import { Store } from 'redux';
import { SnowmanAction } from 'types/SnowmanAction';
import { ViewIDs } from 'types/ViewIDs';

export interface GenericInstanceOwnProps {
  instanceId: ViewIDs;
  children?: JSX.Element | JSX.Element[];
  createSubAppStore(): Store<unknown, SnowmanAction>;
}
