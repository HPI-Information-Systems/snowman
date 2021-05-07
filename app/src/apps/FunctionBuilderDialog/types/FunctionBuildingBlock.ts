import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
import autoBind from 'auto-bind';

export type FunctionBuildingBlockType = SimilarityThresholdFunctionDefinitionTypeEnum | null;

export enum CellDescriptor {
  left,
  mid,
  right,
}

export type LeftRightCellContent =
  | FunctionBuildingBlock
  | number
  | string
  | null;
export type MidCellContent = SimilarityThresholdFunctionOperatorOperatorEnum | null;

export class FunctionBuildingBlock {
  accessKey: number;
  type: FunctionBuildingBlockType;
  left: LeftRightCellContent;
  mid: MidCellContent;
  right: LeftRightCellContent;

  constructor(
    accessKey: number,
    type: FunctionBuildingBlockType,
    left?: LeftRightCellContent,
    mid?: MidCellContent,
    right?: LeftRightCellContent
  ) {
    this.accessKey = accessKey;
    this.type = type;
    this.left = left ?? null;
    this.mid = mid ?? null;
    this.right = right ?? null;
    autoBind(this);
  }

  public navigateToBlockAndMutate(
    targetBlockAccessKey: number,
    mutator: (targetBlock: FunctionBuildingBlock) => void
  ): boolean {
    if (this.accessKey === targetBlockAccessKey) {
      mutator(this);
      return true;
    }
    let resultForLeftRecursion = false;
    if (this.left instanceof FunctionBuildingBlock)
      resultForLeftRecursion = this.left.navigateToBlockAndMutate(
        targetBlockAccessKey,
        mutator
      );
    if (this.right instanceof FunctionBuildingBlock && !resultForLeftRecursion)
      return this.right.navigateToBlockAndMutate(targetBlockAccessKey, mutator);
    return resultForLeftRecursion;
  }

  public removeBlock(targetBlockAccessKey: number): boolean {
    if (
      this.right instanceof FunctionBuildingBlock &&
      this.right.accessKey === targetBlockAccessKey
    ) {
      this.right = null;
      return true;
    }
    if (
      this.left instanceof FunctionBuildingBlock &&
      this.left.accessKey === targetBlockAccessKey
    ) {
      this.left = null;
      return true;
    }
    let resultForLeftRecursion = false;
    if (this.right instanceof FunctionBuildingBlock)
      resultForLeftRecursion = this.right.removeBlock(targetBlockAccessKey);
    if (this.left instanceof FunctionBuildingBlock && !resultForLeftRecursion)
      return this.left.removeBlock(targetBlockAccessKey);
    return resultForLeftRecursion;
  }

  public getBlock(
    targetBlockAccessKey: number
  ): FunctionBuildingBlock | undefined {
    if (this.accessKey === targetBlockAccessKey) {
      return this;
    }
    let resultForLeftRecursion = undefined;
    if (this.left instanceof FunctionBuildingBlock)
      resultForLeftRecursion = this.left.getBlock(targetBlockAccessKey);
    if (this.right instanceof FunctionBuildingBlock && !resultForLeftRecursion)
      return this.right.getBlock(targetBlockAccessKey);
    return resultForLeftRecursion;
  }
}
