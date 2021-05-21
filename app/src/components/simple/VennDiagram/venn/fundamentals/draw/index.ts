import { d3Selection } from 'components/simple/VennDiagram/venn/types/types';

export * from 'components/simple/VennDiagram/venn/fundamentals/draw/circle';
export * from 'components/simple/VennDiagram/venn/fundamentals/draw/ellipsis';
export * from 'components/simple/VennDiagram/venn/fundamentals/draw/intersection';
export * from 'components/simple/VennDiagram/venn/fundamentals/draw/text';
export * from 'components/simple/VennDiagram/venn/fundamentals/draw/tooltip';

export const clearSelection = (selection: d3Selection): void => {
  selection.selectAll('*').remove();
};
