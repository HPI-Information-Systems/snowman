export type ValueOf<T> = T[keyof T];
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function assertType<Base>(): <Extends extends Base>(
  x: Extends
) => Extends {
  return <Extends extends Base>(x: Extends): Extends => x;
}

export type Primitive = string | number | boolean;
export type NestedArray<T> = T | NestedArray<T>[];

export type UndefinedKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: { [P in K]: T[K] | null } extends { [P in K]: T[K] }
    ? K
    : never;
}[keyof T];

export type NonUndefinedKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: { [P in K]: T[K] | null } extends { [P in K]: T[K] }
    ? never
    : K;
}[keyof T];

export type MakeOptional<T> = { [P in keyof T]?: T[P] };
