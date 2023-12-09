"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var ts_morph_1 = require("ts-morph");
var initialize = function (tsConfigFilePath) {
    var project = new ts_morph_1.Project({ tsConfigFilePath: tsConfigFilePath });
    return {
        project: project
    };
};
exports.initialize = initialize;
//# sourceMappingURL=initializer.js.map