"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const nodesets = {};
for (const name in Object.values(index_1.nodesets)) {
    nodesets[name] = `nodeset:${name}`;
}
module.exports = {
    nodesets
};
//# sourceMappingURL=index_web.js.map