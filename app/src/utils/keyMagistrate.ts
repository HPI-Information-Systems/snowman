import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import autoBind from 'auto-bind';
import { max } from 'lodash';

export default class KeyMagistrate {
  private reservedKeys: number[];

  constructor() {
    this.reservedKeys = [];
    autoBind(this);
  }

  getNewKey(): number {
    const newKey = (max(this.reservedKeys) ?? RootAccessKey - 1) + 1;
    this.reservedKeys = [...this.reservedKeys, newKey];
    return newKey;
  }

  revealKeys(): number[] {
    return this.reservedKeys;
  }
}
