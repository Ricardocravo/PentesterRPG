"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodesOfKind = void 0;
function getNodesOfKind(node, kind) {
    return node.getDescendants().filter(function (node) { return node.getKind() === kind; });
}
exports.getNodesOfKind = getNodesOfKind;
//# sourceMappingURL=getNodesOfKind.js.map