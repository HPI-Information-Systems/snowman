import { List } from '../../../../../../../tools/list';
import { Cluster, NodeID } from '../../../cluster/types';

export type SubclusterTransformation = (
  subclusters: Cluster[]
) => List<NodeID[]>;
