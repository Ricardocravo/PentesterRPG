"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if the value here is an all-consuming monstrosity which will consume
 * everything in its transdimensional rage. A.k.a. `null` or `undefined`.
 *
 * @internal
 */
exports.isVoid = (value) => typeof value === 'undefined' || value === null;
/** @internal */
function curry1(op, item) {
    return item !== undefined ? op(item) : op;
}
exports.curry1 = curry1;
// tslint:disable-next-line:class-name
/** @internal */
class _Brand {
    constructor(t) {
        this._brand = t;
    }
}
exports._Brand = _Brand;
//# sourceMappingURL=utils.js.map