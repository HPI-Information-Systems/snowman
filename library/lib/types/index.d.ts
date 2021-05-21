export declare type ValueOf<T> = T[keyof T];
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function assertType<Base>(): <Extends extends Base>(x: Extends) => Extends;
export declare type Primitive = string | number | boolean | undefined | symbol;
export declare type NestedArray<T> = T | NestedArray<T>[];
export declare type UndefinedKeys<T> = {
    [K in keyof T]: {
        [P in K]: T[K] | null;
    } extends {
        [P in K]: T[K];
    } ? K : never;
}[keyof T];
export declare type NonUndefinedKeys<T> = {
    [K in keyof T]: {
        [P in K]: T[K] | null;
    } extends {
        [P in K]: T[K];
    } ? never : K;
}[keyof T];
export declare type MakeOptional<T> = {
    [P in keyof T]?: T[P];
};
export declare type MakeRequired<T> = {
    [key in keyof T]-?: T[key];
};
export declare type InstantiableAbstractClass<T> = (new (...args: any) => {
    [x: string]: any;
}) & T;
export declare type AbstractConstructorParameters<T> = ConstructorParameters<InstantiableAbstractClass<T>>;
export declare type Define<T> = Exclude<T, null | undefined>;
export declare type RemoveFirst<Array extends any[]> = Array extends [any, ...infer U] ? U : Array;
