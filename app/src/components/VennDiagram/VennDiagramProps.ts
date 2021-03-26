import { VennFourSets } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSets } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSets } from 'components/VennDiagram/venn/types/twoSetsTypes';

export interface VennDiagramProps {
  flavor: VennDiagramFlavors;
  sets: VennTwoSets | VennThreeSets | VennFourSets;
}

export enum VennDiagramFlavors {
  TwoSets,
  ThreeSets,
  FourSets,
}
