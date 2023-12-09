/**
  This is just here to re-export [`Maybe`](./_maybe_.html) and
  [`Result`](./_result_.html). It doesn't do anything else.
 */
import * as MaybeNamespace from './maybe';
export declare type Maybe<T> = import('./maybe').Maybe<T>;
export declare const Maybe: typeof MaybeNamespace;
import * as ResultNamespace from './result';
export declare type Result<T, E> = import('./result').Result<T, E>;
export declare const Result: typeof ResultNamespace;
import * as UnitNamespace from './unit';
export declare type Unit = import('./unit').Unit;
export declare const Unit: typeof UnitNamespace;
//# sourceMappingURL=index.d.ts.map