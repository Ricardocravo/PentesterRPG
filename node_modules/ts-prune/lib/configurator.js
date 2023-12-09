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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
var cosmiconfig_1 = require("cosmiconfig");
var commander_1 = __importDefault(require("commander"));
var pick_1 = __importDefault(require("lodash/fp/pick"));
var defaultConfig = {
    project: "tsconfig.json",
    ignore: undefined,
    error: undefined,
    skip: undefined,
};
var onlyKnownConfigOptions = pick_1.default(Object.keys(defaultConfig));
var getConfig = function () {
    var _a;
    var cliConfig = onlyKnownConfigOptions(commander_1.default
        .allowUnknownOption()
        .option('-p, --project [project]', 'TS project configuration file (tsconfig.json)', 'tsconfig.json')
        .option('-i, --ignore [regexp]', 'Path ignore RegExp pattern')
        .option('-e, --error', 'Return error code if unused exports are found')
        .option('-s, --skip [regexp]', 'skip these files when determining whether code is used')
        .parse(process.argv));
    var defaultConfig = {
        project: "tsconfig.json"
    };
    var moduleName = 'ts-prune';
    var explorerSync = cosmiconfig_1.cosmiconfigSync(moduleName);
    var fileConfig = (_a = explorerSync.search()) === null || _a === void 0 ? void 0 : _a.config;
    var config = __assign(__assign(__assign({}, defaultConfig), fileConfig), cliConfig);
    return config;
};
exports.getConfig = getConfig;
//# sourceMappingURL=configurator.js.map