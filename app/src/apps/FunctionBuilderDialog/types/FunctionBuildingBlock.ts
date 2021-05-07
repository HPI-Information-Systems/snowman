import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import autoBind from 'auto-bind';
import { max } from 'lodash';

export type FunctionBuildingBlockType = SimilarityThresholdFunctionDefinitionTypeEnum | null;

export enum CellDescriptor {
  left,
  mid,
  right,
}

type LeftRightCellContent = FunctionBuildingBlock | number | string | null;
type MidCellContent = SimilarityThresholdFunctionOperatorOperatorEnum | null;

export class FunctionBuildingBlock {
  accessKey: number;
  type: FunctionBuildingBlockType;
  left: LeftRightCellContent;
  mid: MidCellContent;
  right: LeftRightCellContent;

  public static getNewAccessKey(reservedAccessKeys: number[]): number {
    return (max(reservedAccessKeys) ?? RootAccessKey) + 1;
  }

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
}
