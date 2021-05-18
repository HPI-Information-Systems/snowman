import { AtomicSelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import {
  EntityItemType,
  EntityOfEntityItemType,
} from 'components/simple/EntityItem/EntityItemType';

export type EntityInputOwnProps = AtomicSelectorGroupProps;

export interface EntityInputStateProps<Type extends EntityItemType> {
  selectedEntities: EntityOfEntityItemType<Type>[];
  entities: EntityOfEntityItemType<Type>[];
  itemType: Type;
}

export interface EntityInputDispatchProps {
  updateSelection(datasetIds: number[]): void;
}

export type EntityInputProps = EntityInputOwnProps &
  EntityInputStateProps<EntityItemType> &
  EntityInputDispatchProps;
