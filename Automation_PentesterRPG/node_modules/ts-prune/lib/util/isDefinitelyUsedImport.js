"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefinitelyUsedImport = void 0;
var containsUnnamedImport = function (decl) {
    return !decl.getImportClause();
};
var isDefinitelyUsedImport = function (decl) {
    return containsUnnamedImport(decl);
};
exports.isDefinitelyUsedImport = isDefinitelyUsedImport;
//# sourceMappingURL=isDefinitelyUsedImport.js.map