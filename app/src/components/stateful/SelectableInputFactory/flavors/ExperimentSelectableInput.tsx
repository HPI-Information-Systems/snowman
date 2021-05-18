import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import EntitySelectableInputFactory from 'components/stateful/SelectableInputFactory/EntitySelectableInputFactory';

const ExperimentSelectableInput = EntitySelectableInputFactory(
  EntityItemType.EXPERIMENT
);
export default ExperimentSelectableInput;
