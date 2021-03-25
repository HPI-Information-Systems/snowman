import { VennFourSets } from 'components/VennDiagram/venn/fourSetsTypes';
import { VennThreeSets } from 'components/VennDiagram/venn/threeSetsTypes';
import { VennTwoSets } from 'components/VennDiagram/venn/twoSetsTypes';

export interface VennDiagramProps {
  flavor: VennDiagramFlavors;
  sets: VennTwoSets | VennThreeSets | VennFourSets;
}

export enum VennDiagramFlavors {
  TwoSets,
  ThreeSets,
  FourSets,
}
