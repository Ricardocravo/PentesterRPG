"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var analyzer_1 = require("./analyzer");
var differenceBy_1 = __importDefault(require("lodash/fp/differenceBy"));
var State = (function () {
    function State() {
        var _this = this;
        this.results = [];
        this.resultsOfType = function (type) {
            return _this.results.filter(function (r) { return r.type === type; });
        };
        this.onResult = function (result) {
            _this.results.push(result);
        };
        this.definitelyUnused = function () {
            return differenceBy_1.default(function (result) { return result.file; }, _this.resultsOfType(analyzer_1.AnalysisResultTypeEnum.POTENTIALLY_UNUSED), _this.resultsOfType(analyzer_1.AnalysisResultTypeEnum.DEFINITELY_USED))
                .filter(function (result) { return result.symbols.length > 0; });
        };
    }
    return State;
}());
exports.State = State;
//# sourceMappingURL=state.js.map