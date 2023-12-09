#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var runner_1 = require("./runner");
Object.defineProperty(exports, "run", { enumerable: true, get: function () { return runner_1.run; } });
var configurator_1 = require("./configurator");
var runner_2 = require("./runner");
var config = configurator_1.getConfig();
var resultCount = runner_2.run(config);
if (resultCount > 0 && config.error) {
    process.exit(1);
}
else {
    process.exit(0);
}
//# sourceMappingURL=index.js.map