import { VennDiagramOneSetConfig } from 'components/simple/VennDiagram/venn/types//oneSetTypes';
import { VennDiagramFourSetsConfig } from 'components/simple/VennDiagram/venn/types/fourSetsTypes';
import { VennDiagramThreeSetsConfig } from 'components/simple/VennDiagram/venn/types/threeSetsTypes';
import { VennDiagramTwoSetsConfig } from 'components/simple/VennDiagram/venn/types/twoSetsTypes';

export type VennDiagramConfig =
  | VennDiagramOneSetConfig
  | VennDiagramTwoSetsConfig
  | VennDiagramThreeSetsConfig
  | VennDiagramFourSetsConfig;

export interface VennDiagramProps {
  config: VennDiagramConfig;
}
