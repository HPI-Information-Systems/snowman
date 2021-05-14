import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import EntitySelectableInputFactory from 'components/stateful/SelectableInputFactory/EntitySelectableInputFactory';

const AlgorithmSelectableInput = EntitySelectableInputFactory(
  EntityItemType.MATCHING_SOLUTION
);
export default AlgorithmSelectableInput;
