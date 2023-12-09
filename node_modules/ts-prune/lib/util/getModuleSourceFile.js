"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleSourceFile = void 0;
var getModuleSourceFile = function (decl) { var _a, _b; return (_b = (_a = decl.getModuleSpecifierSourceFile()) === null || _a === void 0 ? void 0 : _a.getFilePath()) !== null && _b !== void 0 ? _b : null; };
exports.getModuleSourceFile = getModuleSourceFile;
//# sourceMappingURL=getModuleSourceFile.js.map