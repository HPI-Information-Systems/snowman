import { VennDiagramOneSetConfig } from 'components/VennDiagram/venn/types//oneSetTypes';
import { VennDiagramFourSetsConfig } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennDiagramThreeSetsConfig } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennDiagramTwoSetsConfig } from 'components/VennDiagram/venn/types/twoSetsTypes';

export type VennDiagramConfig =
  | VennDiagramOneSetConfig
  | VennDiagramTwoSetsConfig
  | VennDiagramThreeSetsConfig
  | VennDiagramFourSetsConfig;

export interface VennDiagramProps {
  config: VennDiagramConfig;
}
