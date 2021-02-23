export type ValueOf<T> = T[keyof T];
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function assertType<Base>(): <Extends extends Base>(
  x: Extends
) => Extends {
  return <Extends extends Base>(x: Extends): Extends => x;
}
