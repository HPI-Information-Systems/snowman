import { VennFourSetsPayload } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSetsPayload } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsPayload } from 'components/VennDiagram/venn/types/twoSetsTypes';

export interface VennDiagramProps {
  config: VennTwoSetsPayload | VennThreeSetsPayload | VennFourSetsPayload;
}
