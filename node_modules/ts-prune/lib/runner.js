"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var path_1 = __importDefault(require("path"));
var json5_1 = __importDefault(require("json5"));
var fs_1 = __importDefault(require("fs"));
var analyzer_1 = require("./analyzer");
var initializer_1 = require("./initializer");
var state_1 = require("./state");
var presenter_1 = require("./presenter");
var run = function (config, output) {
    var _a;
    if (output === void 0) { output = console.log; }
    var tsConfigPath = config.project;
    var project = initializer_1.initialize(path_1.default.join(process.cwd(), tsConfigPath)).project;
    var tsConfigJSON = json5_1.default.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), tsConfigPath), "utf-8"));
    var entrypoints = ((_a = tsConfigJSON === null || tsConfigJSON === void 0 ? void 0 : tsConfigJSON.files) === null || _a === void 0 ? void 0 : _a.map(function (file) { return path_1.default.join(process.cwd(), file); })) || [];
    var state = new state_1.State();
    analyzer_1.analyze(project, state.onResult, entrypoints, config.skip);
    var presented = presenter_1.present(state);
    var filterIgnored = config.ignore !== undefined ? presented.filter(function (file) { return !file.match(config.ignore); }) : presented;
    filterIgnored.forEach(function (value) {
        output(value);
    });
    return filterIgnored.length;
};
exports.run = run;
//# sourceMappingURL=runner.js.map