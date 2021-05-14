import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import EntitySelectableInputFactory from 'components/stateful/SelectableInputFactory/EntitySelectableInputFactory';

const DatasetSelectableInput = EntitySelectableInputFactory(
  EntityItemType.DATASET
);
export default DatasetSelectableInput;
