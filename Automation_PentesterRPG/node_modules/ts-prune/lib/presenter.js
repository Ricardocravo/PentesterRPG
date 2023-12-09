"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.present = void 0;
var USED_IN_MODULE = ' (used in module)';
var formatOutput = function (file, result) {
    var name = result.name, line = result.line, usedInModule = result.usedInModule;
    return file + ":" + line + " - " + name + (usedInModule ? USED_IN_MODULE : '');
};
var present = function (state) {
    var unused2D = state
        .definitelyUnused()
        .map(function (result) { return ({
        file: result.file.replace(process.cwd(), "").replace(new RegExp("^/"), ""),
        symbols: result.symbols
    }); })
        .map(function (_a) {
        var file = _a.file, symbols = _a.symbols;
        return symbols.map(function (sym) { return formatOutput(file, sym); });
    });
    return [].concat.apply([], unused2D);
};
exports.present = present;
//# sourceMappingURL=presenter.js.map