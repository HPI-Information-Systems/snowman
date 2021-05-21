import { UnionFindBase } from './unionFindBase';

export class UnionFind extends UnionFindBase {
  public link(...args: Parameters<UnionFindBase['link']>): this {
    return super.link(...args);
  }
}
