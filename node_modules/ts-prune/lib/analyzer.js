"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = exports.getPotentiallyUnused = exports.importsForSideEffects = exports.getExported = exports.trackWildcardUses = exports.AnalysisResultTypeEnum = void 0;
var constants_1 = require("./constants");
var ts_morph_1 = require("ts-morph");
var isDefinitelyUsedImport_1 = require("./util/isDefinitelyUsedImport");
var getModuleSourceFile_1 = require("./util/getModuleSourceFile");
var getNodesOfKind_1 = require("./util/getNodesOfKind");
var countBy_1 = __importDefault(require("lodash/fp/countBy"));
var last_1 = __importDefault(require("lodash/fp/last"));
var fs_1 = require("fs");
var AnalysisResultTypeEnum;
(function (AnalysisResultTypeEnum) {
    AnalysisResultTypeEnum[AnalysisResultTypeEnum["POTENTIALLY_UNUSED"] = 0] = "POTENTIALLY_UNUSED";
    AnalysisResultTypeEnum[AnalysisResultTypeEnum["DEFINITELY_USED"] = 1] = "DEFINITELY_USED";
})(AnalysisResultTypeEnum = exports.AnalysisResultTypeEnum || (exports.AnalysisResultTypeEnum = {}));
function handleExportDeclaration(node) {
    return node.getNamedExports().map(function (n) { return n.getName(); });
}
function handleImportDeclaration(node) {
    return (__spreadArray(__spreadArray(__spreadArray([], node.getNamedImports().map(function (n) { return n.getName(); })), (node.getDefaultImport() ? ['default'] : [])), (node.getNamespaceImport() ? exports.trackWildcardUses(node) : [])));
}
var trackWildcardUses = function (node) {
    var clause = node.getImportClause();
    var namespaceImport = clause.getFirstChildByKind(ts_morph_1.ts.SyntaxKind.NamespaceImport);
    var source = node.getSourceFile();
    var uses = getNodesOfKind_1.getNodesOfKind(source, ts_morph_1.ts.SyntaxKind.Identifier)
        .filter(function (n) { var _a, _b; return ((_b = (_a = n.getSymbol()) === null || _a === void 0 ? void 0 : _a.getDeclarations()) !== null && _b !== void 0 ? _b : []).includes(namespaceImport); });
    var symbols = [];
    for (var _i = 0, uses_1 = uses; _i < uses_1.length; _i++) {
        var use = uses_1[_i];
        if (use.getParentIfKind(ts_morph_1.SyntaxKind.NamespaceImport)) {
            continue;
        }
        var p = use.getParentIfKind(ts_morph_1.SyntaxKind.PropertyAccessExpression);
        if (p) {
            symbols.push(p.getName());
            continue;
        }
        var el = use.getParentIfKind(ts_morph_1.SyntaxKind.ElementAccessExpression);
        if (el) {
            var arg = el.getArgumentExpression();
            if (arg.getKind() === ts_morph_1.SyntaxKind.StringLiteral) {
                symbols.push(arg.getLiteralText());
                continue;
            }
        }
        var varExp = use.getParentIfKind(ts_morph_1.SyntaxKind.VariableDeclaration);
        if (varExp) {
            var nameNode = varExp.getNameNode();
            if (nameNode.getKind() === ts_morph_1.SyntaxKind.ObjectBindingPattern) {
                var binder = nameNode;
                for (var _a = 0, _b = binder.getElements(); _a < _b.length; _a++) {
                    var bindEl = _b[_a];
                    var p_1 = bindEl.getPropertyNameNode();
                    if (p_1) {
                        symbols.push(p_1.getText());
                    }
                    else {
                        symbols.push(bindEl.getName());
                    }
                }
                continue;
            }
        }
        var qualExp = use.getParentIfKind(ts_morph_1.SyntaxKind.QualifiedName);
        if (qualExp) {
            symbols.push(qualExp.getRight().getText());
            continue;
        }
        return ['*'];
    }
    return symbols;
};
exports.trackWildcardUses = trackWildcardUses;
function handleDynamicImport(node) {
    return ["*"];
}
var nodeHandlers = (_a = {},
    _a[ts_morph_1.ts.SyntaxKind.ExportDeclaration.toString()] = handleExportDeclaration,
    _a[ts_morph_1.ts.SyntaxKind.ImportDeclaration.toString()] = handleImportDeclaration,
    _a[ts_morph_1.ts.SyntaxKind.CallExpression.toString()] = handleDynamicImport,
    _a);
var mustIgnore = function (symbol, file) {
    var _a, _b;
    var symbolLinePos = symbol
        .getDeclarations()
        .map(function (decl) { return decl.getStartLinePos(); })
        .reduce(function (currentMin, current) { return Math.min(currentMin, current); }, Infinity);
    var comments = (_a = file
        .getDescendantAtPos(symbolLinePos)) === null || _a === void 0 ? void 0 : _a.getLeadingCommentRanges();
    if (!comments) {
        return false;
    }
    return (_b = last_1.default(comments)) === null || _b === void 0 ? void 0 : _b.getText().includes(constants_1.ignoreComment);
};
var lineNumber = function (symbol) {
    return symbol.getDeclarations().map(function (decl) { return decl.getStartLineNumber(); }).reduce(function (currentMin, current) { return Math.min(currentMin, current); }, Infinity);
};
var getExported = function (file) {
    return file.getExportSymbols()
        .filter(function (symbol) { return !mustIgnore(symbol, file); })
        .map(function (symbol) { return ({
        name: symbol.compilerSymbol.name,
        line: lineNumber(symbol)
    }); });
};
exports.getExported = getExported;
var importsForSideEffects = function (file) {
    return file
        .getImportDeclarations()
        .map(function (decl) { return ({
        moduleSourceFile: getModuleSourceFile_1.getModuleSourceFile(decl),
        definitelyUsed: isDefinitelyUsedImport_1.isDefinitelyUsedImport(decl)
    }); })
        .filter(function (meta) { return meta.definitelyUsed && !!meta.moduleSourceFile; })
        .map(function (_a) {
        var moduleSourceFile = _a.moduleSourceFile;
        return ({
            file: moduleSourceFile,
            symbols: [],
            type: AnalysisResultTypeEnum.DEFINITELY_USED
        });
    });
};
exports.importsForSideEffects = importsForSideEffects;
var exportWildCards = function (file) {
    return file
        .getExportDeclarations()
        .filter(function (decl) { return decl.getText().includes("*"); })
        .map(function (decl) { return ({
        file: getModuleSourceFile_1.getModuleSourceFile(decl),
        symbols: [],
        type: AnalysisResultTypeEnum.DEFINITELY_USED
    }); });
};
var getDefinitelyUsed = function (file) { return (__spreadArray(__spreadArray([], exports.importsForSideEffects(file)), exportWildCards(file))); };
var getReferences = function (originalList, skipper) {
    if (skipper) {
        return originalList.filter(function (file) {
            return !skipper.test(file.getSourceFile().compilerNode.fileName);
        });
    }
    return originalList;
};
var getPotentiallyUnused = function (file, skipper) {
    var exported = exports.getExported(file);
    var idsInFile = file.getDescendantsOfKind(ts_morph_1.ts.SyntaxKind.Identifier);
    var referenceCounts = countBy_1.default(function (x) { return x; })((idsInFile || []).map(function (node) { return node.getText(); }));
    var referencedInFile = Object.entries(referenceCounts)
        .reduce(function (previous, _a) {
        var name = _a[0], count = _a[1];
        return previous.concat(count > 1 ? [name] : []);
    }, []);
    var referenced = getReferences(file.getReferencingNodesInOtherSourceFiles(), skipper).reduce(function (previous, node) {
        var _a, _b;
        var kind = node.getKind().toString();
        var value = (_b = (_a = nodeHandlers === null || nodeHandlers === void 0 ? void 0 : nodeHandlers[kind]) === null || _a === void 0 ? void 0 : _a.call(nodeHandlers, node)) !== null && _b !== void 0 ? _b : [];
        return previous.concat(value);
    }, []);
    var unused = referenced.includes("*") ? [] :
        exported.filter(function (exp) { return !referenced.includes(exp.name); })
            .map(function (exp) { return (__assign(__assign({}, exp), { usedInModule: referencedInFile.includes(exp.name) })); });
    return {
        file: file.getFilePath(),
        symbols: unused,
        type: AnalysisResultTypeEnum.POTENTIALLY_UNUSED
    };
};
exports.getPotentiallyUnused = getPotentiallyUnused;
var emitTsConfigEntrypoints = function (entrypoints, onResult) {
    return entrypoints.map(function (file) { return ({
        file: file,
        symbols: [],
        type: AnalysisResultTypeEnum.DEFINITELY_USED,
    }); }).forEach(function (emittable) { return onResult(emittable); });
};
var filterSkippedFiles = function (sourceFiles, skipper) {
    if (!skipper) {
        return sourceFiles;
    }
    return sourceFiles.filter(function (file) { return !skipper.test(file.getSourceFile().compilerNode.fileName); });
};
var analyze = function (project, onResult, entrypoints, skipPattern) {
    var skipper = skipPattern ? new RegExp(skipPattern) : undefined;
    filterSkippedFiles(project.getSourceFiles(), skipper)
        .forEach(function (file) {
        __spreadArray([
            exports.getPotentiallyUnused(file, skipper)
        ], getDefinitelyUsed(file)).forEach(function (result) {
            if (!result.file)
                return;
            onResult(__assign(__assign({}, result), { file: fs_1.realpathSync(result.file) }));
        });
    });
    emitTsConfigEntrypoints(entrypoints, onResult);
};
exports.analyze = analyze;
//# sourceMappingURL=analyzer.js.map