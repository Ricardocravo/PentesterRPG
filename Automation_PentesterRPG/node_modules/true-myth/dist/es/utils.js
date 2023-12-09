/** @internal */
/**
 * Check if the value here is an all-consuming monstrosity which will consume
 * everything in its transdimensional rage. A.k.a. `null` or `undefined`.
 *
 * @internal
 */
export const isVoid = (value) => typeof value === 'undefined' || value === null;
/** @internal */
export function curry1(op, item) {
    return item !== undefined ? op(item) : op;
}
// tslint:disable-next-line:class-name
/** @internal */
export class _Brand {
    constructor(t) {
        this._brand = t;
    }
}
//# sourceMappingURL=utils.js.map