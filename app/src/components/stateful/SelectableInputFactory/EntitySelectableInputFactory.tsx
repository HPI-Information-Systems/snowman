import EntityItem from 'components/simple/EntityItem/EntityItem';
import {
  EntityItemType,
  EntityItemTypes,
  EntityOfEntityItemType,
} from 'components/simple/EntityItem/EntityItemType';
import SelectableInputFactory from 'components/stateful/SelectableInputFactory/SelectableInputFactory';
import React from 'react';
import { fuzzyStringIncludes } from 'utils/fuzzyStringIncludes';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface EntitySelectableInputOwnProps<
  EntityType extends EntityItemType
> extends GenericStoreComponentProps {
  selection: number[];
  allOptions: EntityOfEntityItemType<EntityType>[];
  allowMultiselect: boolean;
  onChange: (newSelection: number[]) => void;
}

const RawEntitySelectableInput = SelectableInputFactory<EntityItemTypes>();
const EntitySelectableInputFactory = function <
  EntityType extends EntityItemType
>(
  itemType: EntityType
): (props: EntitySelectableInputOwnProps<EntityType>) => JSX.Element {
  const EntitySelectableInput = ({
    selection,
    onChange,
    ...props
  }: EntitySelectableInputOwnProps<EntityType>) => (
    <RawEntitySelectableInput
      selection={selection.map((id) => `${id}`)}
      onChange={(newSelection) =>
        onChange(newSelection.map((id) => parseInt(id)))
      }
      {...props}
      getID={({ id }) => `${id}`}
      matches={({ name, description }, search) =>
        fuzzyStringIncludes(name, search) ||
        (description ? fuzzyStringIncludes(description, search) : false)
      }
      renderChild={(entity) => <EntityItem itemType={itemType} item={entity} />}
      instanceDescriptor={`EntitySelectableInput-${itemType}`}
    />
  );
  return EntitySelectableInput;
};

export default EntitySelectableInputFactory;
