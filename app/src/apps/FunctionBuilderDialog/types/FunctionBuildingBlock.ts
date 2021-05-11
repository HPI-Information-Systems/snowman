import {
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionDefinition,
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
} from 'api';
import { UpdatePrepareInformation } from 'apps/FunctionBuilderDialog/types/UpdatePrepareInformation';
import autoBind from 'auto-bind';
import KeyMagistrate from 'utils/keyMagistrate';

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
  constructor(
    public accessKey: number,
    public type: FunctionBuildingBlockType,
    public left: LeftRightCellContent = null,
    public mid: MidCellContent = null,
    public right: LeftRightCellContent = null
  ) {
    autoBind(this);
  }

  private static getFBBValueAssignment(
    keyGenerator: KeyMagistrate,
    aSimilarityThresholdFunctionDef: SimilarityThresholdFunctionDefinition
  ): [
    LeftRightCellContent | undefined,
    MidCellContent | undefined,
    LeftRightCellContent | undefined
  ] {
    switch (aSimilarityThresholdFunctionDef.type) {
      case SimilarityThresholdFunctionDefinitionTypeEnum.Constant:
        return [aSimilarityThresholdFunctionDef.constant, undefined, undefined];
      case SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold:
        return [
          aSimilarityThresholdFunctionDef.similarityThreshold,
          undefined,
          undefined,
        ];
      case SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator:
        return [
          aSimilarityThresholdFunctionDef.unaryOperator?.operator,
          undefined,
          aSimilarityThresholdFunctionDef.unaryOperator !== undefined
            ? FunctionBuildingBlock.getFBBFromAPISimilarityFunctionDef(
                keyGenerator,
                aSimilarityThresholdFunctionDef.unaryOperator.func
              )
            : undefined,
        ];
      case SimilarityThresholdFunctionDefinitionTypeEnum.Operator:
        return [
          aSimilarityThresholdFunctionDef.operator !== undefined
            ? FunctionBuildingBlock.getFBBFromAPISimilarityFunctionDef(
                keyGenerator,
                aSimilarityThresholdFunctionDef.operator.left
              )
            : undefined,
          aSimilarityThresholdFunctionDef.operator?.operator,
          aSimilarityThresholdFunctionDef.operator !== undefined
            ? FunctionBuildingBlock.getFBBFromAPISimilarityFunctionDef(
                keyGenerator,
                aSimilarityThresholdFunctionDef.operator.right
              )
            : undefined,
        ];
    }
  }

  private static getFBBFromAPISimilarityFunctionDef(
    keyGenerator: KeyMagistrate,
    aSimilarityThresholdFunction: SimilarityThresholdFunctionDefinition
  ): FunctionBuildingBlock {
    return new FunctionBuildingBlock(
      keyGenerator.getNewKey(),
      aSimilarityThresholdFunction.type,
      ...FunctionBuildingBlock.getFBBValueAssignment(
        keyGenerator,
        aSimilarityThresholdFunction
      )
    );
  }

  public static getFBBFromAPISimilarityFunction(
    aSimilarityThresholdFunction: SimilarityThresholdFunction
  ): UpdatePrepareInformation {
    const keyMagistrate = new KeyMagistrate();
    return [
      FunctionBuildingBlock.getFBBFromAPISimilarityFunctionDef(
        keyMagistrate,
        aSimilarityThresholdFunction.definition
      ),
      keyMagistrate.revealKeys(),
    ];
  }

  public getFunctionDefinition():
    | SimilarityThresholdFunctionDefinition
    | never {
    switch (this.type) {
      case SimilarityThresholdFunctionDefinitionTypeEnum.Constant:
        if (this.left === null) throw Error('No constant value given');
        return {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
          constant: this.left as number,
        };
      case SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold:
        if (this.left === null) throw Error('No similarity threshold given');
        return {
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
          similarityThreshold: this.left as string,
        };
      case SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator:
        if (this.left === null) throw Error('No operator set');
        if (!(this.right instanceof FunctionBuildingBlock))
          throw Error('No operand set');
        return {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
          unaryOperator: {
            func: this.right.getFunctionDefinition(),
            operator: this
              .left as SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
          },
        };
      case SimilarityThresholdFunctionDefinitionTypeEnum.Operator:
        if (!(this.left instanceof FunctionBuildingBlock))
          throw Error('No left operand set');
        if (!(this.right instanceof FunctionBuildingBlock))
          throw Error('No right operand set');
        if (this.mid === null) throw Error('No operator set');
        return {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
          operator: {
            left: this.left.getFunctionDefinition(),
            right: this.left.getFunctionDefinition(),
            operator: this
              .mid as SimilarityThresholdFunctionOperatorOperatorEnum,
          },
        };
      default:
        throw Error('Type not set');
    }
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
