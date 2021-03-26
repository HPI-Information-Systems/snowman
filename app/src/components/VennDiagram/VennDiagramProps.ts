import { VennFourSetsPayload } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSetsPayload } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsPayload } from 'components/VennDiagram/venn/types/twoSetsTypes';

export interface VennDiagramProps {
  flavor: VennDiagramFlavors;
  payload: VennTwoSetsPayload | VennThreeSetsPayload | VennFourSetsPayload;
}

export enum VennDiagramFlavors {
  TwoSets,
  ThreeSets,
  FourSets,
}
