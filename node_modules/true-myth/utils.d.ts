/** @internal */
/**
 * Check if the value here is an all-consuming monstrosity which will consume
 * everything in its transdimensional rage. A.k.a. `null` or `undefined`.
 *
 * @internal
 */
export declare const isVoid: (value: any) => value is null | undefined;
/** @internal */
export declare function curry1<T, U>(op: (t: T) => U, item?: T): U | ((t: T) => U);
/** @internal */
export declare type AndThenAliases = 'andThen' | 'chain' | 'flatMap';
/** @internal */
export declare class _Brand<Tag extends string> {
    private _brand;
    constructor(t: Tag);
}
//# sourceMappingURL=utils.d.ts.map