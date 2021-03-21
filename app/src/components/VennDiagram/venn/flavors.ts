import { stageFourEllipsisOn } from 'components/VennDiagram/venn/fourSets';
import { stageThreeCirclesOn } from 'components/VennDiagram/venn/threeSets';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { stageTwoCirclesOn } from 'components/VennDiagram/venn/twoSets';
import { d3Selection } from 'components/VennDiagram/venn/types';

export const VennDiagramFlavors: Record<
  number,
  {
    renderer: (stage: d3Selection, tooltip: VennTooltip) => void;
    canvas: {
      width: number;
      height: number;
    };
  }
> = {
  2: {
    renderer: stageTwoCirclesOn,
    canvas: {
      width: 600,
      height: 320,
    },
  },
  3: {
    renderer: stageThreeCirclesOn,
    canvas: {
      width: 600,
      height: 480,
    },
  },
  4: {
    renderer: stageFourEllipsisOn,
    canvas: {
      width: 600,
      height: 500,
    },
  },
};
